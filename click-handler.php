<?php
/**
 * CLICK SHOP API — обработчик Prepare и Complete
 *
 * Этот файл принимает POST-запросы от серверов CLICK.
 * Зарегистрируйте URL этого файла в личном кабинете CLICK
 * как «URL биллинга» (Billing URL).
 *
 * Ключи хранятся в myconfig.php ВЫШЕ веб-папки.
 * Никогда не коммитьте myconfig.php в Git.
 */

header('Content-Type: application/json; charset=utf-8');

// ─── Загрузка конфига (находится УРОВНЕМ ВЫШЕ) ────────────────────────────────
$config_path = __DIR__ . '/../myconfig.php';
if (!file_exists($config_path)) {
    echo json_encode([
        'error' => -9,
        'error_note' => 'Server config file not found',
    ]);
    exit;
}

require_once $config_path;
// ──────────────────────────────────────────────────────────────────────────────

if (!defined('CLICK_SECRET_KEY') || !defined('CLICK_SERVICE_ID')) {
    echo json_encode([
        'error' => -9,
        'error_note' => 'Server config is invalid',
    ]);
    exit;
}

define('PAYMENTS_FILE', __DIR__ . '/payments.json');

// Разрешаем только POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => -3, 'error_note' => 'Method not allowed']);
    exit;
}

// ─── Читаем параметры запроса ─────────────────────────────────────────────────
$click_trans_id      = isset($_POST['click_trans_id'])      ? (string)(int)$_POST['click_trans_id']      : null;
$service_id          = isset($_POST['service_id'])          ? (int)$_POST['service_id']                  : null;
$click_paydoc_id     = isset($_POST['click_paydoc_id'])     ? (string)(int)$_POST['click_paydoc_id']     : null;
$merchant_trans_id   = isset($_POST['merchant_trans_id'])   ? trim($_POST['merchant_trans_id'])           : null;
$merchant_prepare_id = isset($_POST['merchant_prepare_id']) ? (int)$_POST['merchant_prepare_id']         : null;
$amount              = isset($_POST['amount'])              ? (float)$_POST['amount']                    : null;
$action              = isset($_POST['action'])              ? (int)$_POST['action']                      : null;
$error               = isset($_POST['error'])               ? (int)$_POST['error']                       : 0;
$sign_time           = isset($_POST['sign_time'])           ? trim($_POST['sign_time'])                  : null;
$sign_string         = isset($_POST['sign_string'])         ? trim($_POST['sign_string'])                : null;

// ─── Проверяем обязательные поля ──────────────────────────────────────────────
if (
    $click_trans_id === null || $service_id === null ||
    $merchant_trans_id === null || $amount === null ||
    $action === null || $sign_time === null || $sign_string === null
) {
    echo json_encode([
        'error'             => -3,
        'error_note'        => 'Missing required parameters',
        'click_trans_id'    => $click_trans_id,
        'merchant_trans_id' => $merchant_trans_id,
    ]);
    exit;
}

// ─── Проверяем action ─────────────────────────────────────────────────────────
if ($action !== 0 && $action !== 1) {
    echo json_encode([
        'error'             => -3,
        'error_note'        => 'Action not found',
        'click_trans_id'    => $click_trans_id,
        'merchant_trans_id' => $merchant_trans_id,
    ]);
    exit;
}

// ─── Проверяем service_id ─────────────────────────────────────────────────────
if ((string)$service_id !== (string)CLICK_SERVICE_ID) {
    echo json_encode([
        'error'             => -5,
        'error_note'        => 'Service not found',
        'click_trans_id'    => $click_trans_id,
        'merchant_trans_id' => $merchant_trans_id,
    ]);
    exit;
}

// ─── Проверяем подпись (sign_string) ─────────────────────────────────────────
if ($action === 0) {
    // Prepare: md5(click_trans_id + service_id + SECRET_KEY + merchant_trans_id + amount + action + sign_time)
    $expected_sign = md5(
        $click_trans_id . $service_id . CLICK_SECRET_KEY .
        $merchant_trans_id . $amount . $action . $sign_time
    );
} else {
    // Complete: md5(click_trans_id + service_id + SECRET_KEY + merchant_trans_id + merchant_prepare_id + amount + action + sign_time)
    $expected_sign = md5(
        $click_trans_id . $service_id . CLICK_SECRET_KEY .
        $merchant_trans_id . $merchant_prepare_id . $amount . $action . $sign_time
    );
}

if (!hash_equals($expected_sign, $sign_string)) {
    echo json_encode([
        'error'             => -1,
        'error_note'        => 'SIGN CHECK FAILED!',
        'click_trans_id'    => $click_trans_id,
        'merchant_trans_id' => $merchant_trans_id,
    ]);
    exit;
}

// ─── Загружаем хранилище платежей ────────────────────────────────────────────
function load_payments() {
    if (!file_exists(PAYMENTS_FILE)) {
        return [];
    }
    $data = file_get_contents(PAYMENTS_FILE);
    return json_decode($data, true) ?: [];
}

function save_payments(array $payments) {
    file_put_contents(PAYMENTS_FILE, json_encode($payments, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);
}

// ─── PREPARE (action = 0) ────────────────────────────────────────────────────
if ($action === 0) {

    $payments = load_payments();

    // Проверяем дубликат — этот click_trans_id уже был подготовлен?
    foreach ($payments as $p) {
        if ($p['click_trans_id'] === $click_trans_id && $p['status'] !== 'cancelled') {
            echo json_encode([
                'click_trans_id'      => (int)$click_trans_id,
                'merchant_trans_id'   => $merchant_trans_id,
                'merchant_prepare_id' => $p['prepare_id'],
                'error'               => -4,
                'error_note'          => 'Already prepared',
            ]);
            exit;
        }
    }

    // Проверяем минимальную сумму (1000 UZS)
    if ($amount < 1000) {
        echo json_encode([
            'click_trans_id'      => (int)$click_trans_id,
            'merchant_trans_id'   => $merchant_trans_id,
            'merchant_prepare_id' => 0,
            'error'               => -2,
            'error_note'          => 'Incorrect parameter amount',
        ]);
        exit;
    }

    // Сохраняем запись о платеже
    $prepare_id = (int)(microtime(true) * 1000) + rand(1, 99);

    $payments[] = [
        'prepare_id'        => $prepare_id,
        'click_trans_id'    => $click_trans_id,
        'click_paydoc_id'   => $click_paydoc_id,
        'merchant_trans_id' => $merchant_trans_id,
        'amount'            => $amount,
        'status'            => 'prepared',
        'created_at'        => date('Y-m-d H:i:s'),
    ];

    save_payments($payments);

    echo json_encode([
        'click_trans_id'      => (int)$click_trans_id,
        'merchant_trans_id'   => $merchant_trans_id,
        'merchant_prepare_id' => $prepare_id,
        'error'               => 0,
        'error_note'          => 'Success',
    ]);
    exit;
}

// ─── COMPLETE (action = 1) ───────────────────────────────────────────────────
if ($action === 1) {

    $payments = load_payments();

    // Ищем запись по prepare_id и click_trans_id
    $found_index = -1;
    foreach ($payments as $index => $p) {
        if (
            $p['prepare_id']     === $merchant_prepare_id &&
            $p['click_trans_id'] === $click_trans_id
        ) {
            $found_index = $index;
            break;
        }
    }

    if ($found_index === -1) {
        echo json_encode([
            'click_trans_id'      => (int)$click_trans_id,
            'merchant_trans_id'   => $merchant_trans_id,
            'merchant_confirm_id' => 0,
            'error'               => -6,
            'error_note'          => 'Transaction not found',
        ]);
        exit;
    }

    // Платёж уже подтверждён?
    if ($payments[$found_index]['status'] === 'confirmed') {
        echo json_encode([
            'click_trans_id'      => (int)$click_trans_id,
            'merchant_trans_id'   => $merchant_trans_id,
            'merchant_confirm_id' => $payments[$found_index]['confirm_id'],
            'error'               => -4,
            'error_note'          => 'Already paid',
        ]);
        exit;
    }

    // CLICK сообщил об ошибке на своей стороне — отменяем платёж
    if ($error < 0) {
        $payments[$found_index]['status']      = 'cancelled';
        $payments[$found_index]['cancelled_at'] = date('Y-m-d H:i:s');
        save_payments($payments);

        echo json_encode([
            'click_trans_id'      => (int)$click_trans_id,
            'merchant_trans_id'   => $merchant_trans_id,
            'merchant_confirm_id' => 0,
            'error'               => 0,
            'error_note'          => 'Success',
        ]);
        exit;
    }

    // Подтверждаем платёж
    $confirm_id = (int)(microtime(true) * 1000) + rand(1, 99);

    $payments[$found_index]['status']       = 'confirmed';
    $payments[$found_index]['confirm_id']   = $confirm_id;
    $payments[$found_index]['confirmed_at'] = date('Y-m-d H:i:s');

    save_payments($payments);

    echo json_encode([
        'click_trans_id'      => (int)$click_trans_id,
        'merchant_trans_id'   => $merchant_trans_id,
        'merchant_confirm_id' => $confirm_id,
        'error'               => 0,
        'error_note'          => 'Success',
    ]);
    exit;
}
