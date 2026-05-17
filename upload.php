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
        
        // 1. Check for basic PHP upload errors
        if ($file['error'] !== UPLOAD_ERR_OK) {
            http_response_code(400);
            echo json_encode(['error' => 'Upload error code: ' . $file['error'] . ' (Shayad file size php.ini limit se bada hai)']);
            exit;
        }
        
        // 2. NAYA LOGIC: Safe PDF Validation (Bina finfo_open ke)
        $fileExtension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        $mimeType = $file['type']; // Browser dwara bheja gaya MIME type
        
        if ($fileExtension !== 'pdf' || $mimeType !== 'application/pdf') {
            http_response_code(400);
            echo json_encode(['error' => 'Only PDF files are allowed.']);
            exit;
        }
        
        // 3. Save file safely
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
            echo json_encode(['error' => 'Failed to move uploaded file. Server permission issue.']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'No file provided. (Shayad file 8MB/POST limit se badi hai)']);
    }
}
?>