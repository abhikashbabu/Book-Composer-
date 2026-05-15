<?php
header('Content-Type: application/json');

// Database file
$dbFile = 'bookmarks.json';

// Initialize database
if (!file_exists($dbFile)) {
    file_put_contents($dbFile, json_encode([]));
}

$request = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

if ($request === 'POST' && $action === 'save') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $bookmarks = json_decode(file_get_contents($dbFile), true);
    $bookmarks[] = [
        'id' => uniqid(),
        'page' => $data['page'] ?? 0,
        'note' => $data['note'] ?? '',
        'timestamp' => date('Y-m-d H:i:s')
    ];
    
    file_put_contents($dbFile, json_encode($bookmarks));
    
    echo json_encode(['success' => true, 'message' => 'Bookmark saved']);
} elseif ($request === 'GET' && $action === 'list') {
    $bookmarks = json_decode(file_get_contents($dbFile), true);
    echo json_encode(['success' => true, 'bookmarks' => $bookmarks]);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request']);
}
?>