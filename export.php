<?php
// Output buffering start kiya taaki koi extra space ya error PDF ko corrupt na kare
ob_start();

// Make sure ye paths ekdum sahi hon aapke folder structure ke hisaab se
require_once('fpdf/fpdf.php');
require_once('fpdi/src/autoload.php');

use setasign\Fpdi\Fpdi;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    if (!isset($_FILES['sourceFile']) || $_FILES['sourceFile']['error'] !== UPLOAD_ERR_OK) {
        ob_end_clean(); // Clean buffer on error
        http_response_code(400);
        echo json_encode(['error' => 'No file uploaded or upload error.']);
        exit;
    }

    $uploadedFile = $_FILES['sourceFile']['tmp_name'];
    
    try {
        // Initialize FPDI (Landscape A4: 297mm x 210mm)
        $pdf = new Fpdi('L', 'mm', 'A4');
        
        $pageCount = $pdf->setSourceFile($uploadedFile);

        // Put 2 pages on 1 A4 sheet
        for ($i = 1; $i <= $pageCount; $i += 2) {
            $pdf->AddPage();

            // Import and place Left Page
            $templateId1 = $pdf->importPage($i);
            $pdf->useTemplate($templateId1, 0, 0, 148.5, 210);

            // Import and place Right Page (if exists)
            if ($i + 1 <= $pageCount) {
                $templateId2 = $pdf->importPage($i + 1);
                $pdf->useTemplate($templateId2, 148.5, 0, 148.5, 210);
            }
        }

        // SABSE IMPORTANT: PDF output hone se pehle buffer ko clean karna
        ob_end_clean();

        // Return the generated PDF directly as a binary blob download
        header('Content-Type: application/pdf');
        header('Content-Disposition: attachment; filename="formatted-booklet.pdf"');
        
        // Output method 'S' returns the document as a string, ideal for API/Fetch
        echo $pdf->Output('S');
        exit;
        
    } catch (Exception $e) {
        ob_end_clean(); // Clean buffer on exception
        http_response_code(500);
        echo json_encode(['error' => 'Error processing PDF: ' . $e->getMessage()]);
        exit;
    }
} else {
    ob_end_clean();
    http_response_code(405);
    echo "Method not allowed. Please use POST.";
}
?>