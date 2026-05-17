<?php
ob_start(); // Output buffering to prevent PDF corruption

require_once('fpdf/fpdf.php');
require_once('fpdi/src/autoload.php');

use setasign\Fpdi\Fpdi;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_FILES['sourceFile']) || $_FILES['sourceFile']['error'] !== UPLOAD_ERR_OK) {
        ob_end_clean();
        http_response_code(400);
        echo json_encode(['error' => 'No file uploaded or upload error.']);
        exit;
    }

    $uploadedFile = $_FILES['sourceFile']['tmp_name'];
    
    try {
        $pdf = new Fpdi('L', 'mm', 'A4');
        $pageCount = $pdf->setSourceFile($uploadedFile);

        for ($i = 1; $i <= $pageCount; $i += 2) {
            $pdf->AddPage();

            // Left Page
            $templateId1 = $pdf->importPage($i);
            $pdf->useTemplate($templateId1, 0, 0, 148.5, 210);

            // Right Page (If exists)
            if ($i + 1 <= $pageCount) {
                $templateId2 = $pdf->importPage($i + 1);
                $pdf->useTemplate($templateId2, 148.5, 0, 148.5, 210);
            }
        }

        ob_end_clean(); // Final clean before output
        header('Content-Type: application/pdf');
        header('Content-Disposition: attachment; filename="formatted-booklet.pdf"');
        
        echo $pdf->Output('S'); // Send as string to fetch API
        exit;
        
    } catch (Exception $e) {
        ob_end_clean();
        http_response_code(500);
        echo json_encode(['error' => 'Error processing PDF: ' . $e->getMessage()]);
        exit;
    }
} else {
    ob_end_clean();
    http_response_code(405);
    echo "Method not allowed.";
}
?>