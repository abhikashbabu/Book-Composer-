<?php
header('Content-Type: application/json');

// Create uploads directory if not exists
$uploadsDir = 'uploads';
if (!is_dir($uploadsDir)) {
    mkdir($uploadsDir, 0755, true);
}

// Handle file upload
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['pdf'])) {
        $file = $_FILES['pdf'];
        
        // Validate file
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);
        
        if ($mimeType !== 'application/pdf') {
            http_response_code(400);
            echo json_encode(['error' => 'Only PDF files are allowed']);
            exit;
        }
        
        // Save file
        $filename = uniqid() . '_' . basename($file['name']);
        $filepath = $uploadsDir . '/' . $filename;
        
        if (move_uploaded_file($file['tmp_name'], $filepath)) {
            echo json_encode([
                'success' => true,
                'file' => $filename,
                'path' => $filepath
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to upload file']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'No file provided']);
    }
}
?>