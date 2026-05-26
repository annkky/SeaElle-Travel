<?php
/**
 * pay-init.php — инициализация платежа CLICK
 *
 * Принимает POST-запрос с фронтенда: { method, amount, ref, return_url }
 * Читает ключи из конфига (уровнем выше) и возвращает данные для запуска оплаты.
 *
 * Ни один ключ не хранится на фронтенде.
 */

header('Content-Type: application/json; charset=utf-8');

// ─── Загрузка конфига (находится УРОВНЕМ ВЫШЕ) ────────────────────────────────
$config_path = __DIR__ . '/../myconfig.php';
if (!file_exists($config_path)) {
    http_response_code(503);
    echo json_encode(['success' => false, 'error' => 'Server config file not found']);
    exit;
}

require_once $config_path;
// ──────────────────────────────────────────────────────────────────────────────

// Разрешаем только POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Читаем JSON-тело запроса
$body       = json_decode(file_get_contents('php://input'), true) ?: [];
$method     = isset($body['method'])     ? trim($body['method'])         : '';
$amount     = isset($body['amount'])     ? (float)$body['amount']        : 0;
$ref        = isset($body['ref'])        ? trim($body['ref'])            : '';
$return_url = isset($body['return_url']) ? trim($body['return_url'])     : '';

// Валидация входных данных
if (!in_array($method, ['click', 'card'], true)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid method']);
    exit;
}

if ($amount < 1000) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid amount']);
    exit;
}

if (empty($ref)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing reference']);
    exit;
}

// Читаем ключи из конфига — только здесь, на сервере
$service_id  = defined('CLICK_SERVICE_ID') ? CLICK_SERVICE_ID : '';
$merchant_id = defined('CLICK_MERCHANT_ID') ? CLICK_MERCHANT_ID : '';

if (empty($service_id) || empty($merchant_id)) {
    http_response_code(503);
    echo json_encode(['success' => false, 'error' => 'Payment not configured on server']);
    exit;
}

$amount_formatted = number_format($amount, 2, '.', '');

// ─── CLICK (переход на страницу оплаты) ──────────────────────────────────────
if ($method === 'click') {
    $params = http_build_query([
        'service_id'        => $service_id,
        'merchant_id'       => $merchant_id,
        'amount'            => $amount_formatted,
        'transaction_param' => $ref,
        'return_url'        => $return_url,
    ]);

    echo json_encode([
        'success' => true,
        'url'     => 'https://my.click.uz/services/pay/?' . $params,
    ]);
    exit;
}

// ─── Оплата по карте (checkout.js overlay) ───────────────────────────────────
if ($method === 'card') {
    echo json_encode([
        'success'           => true,
        'service_id'        => $service_id,
        'merchant_id'       => $merchant_id,
        'amount'            => $amount,
        'transaction_param' => $ref,
    ]);
    exit;
}
