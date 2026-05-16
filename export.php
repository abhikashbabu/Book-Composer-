<?php
header('Content-Type: application/pdf');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

// Get JSON data
$json = file_get_contents('php://input');
$settings = json_decode($json, true);

if (!$settings) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Invalid settings']);
    exit;
}

// Check if mPDF library is installed
$composerAutoload = __DIR__ . '/vendor/autoload.php';

if (!file_exists($composerAutoload)) {
    // Fallback: Generate a simple PDF using built-in functions
    generateSimplePDF($settings);
    exit;
}

require_once $composerAutoload;

use Mpdf\Mpdf;

try {
    // Get dimensions
    $paperSize = $settings['paperSize'];
    $paperSizes = [
        'A4' => 'A4',
        'A5' => 'A5',
        'Letter' => 'Letter',
        'Legal' => 'Legal',
        'Custom' => [
            floatval($settings['customWidth']),
            floatval($settings['customHeight'])
        ]
    ];
    
    $format = isset($paperSizes[$paperSize]) ? $paperSizes[$paperSize] : 'A4';
    
    // Get margins
    $margin_top = floatval($settings['margin']['top']);
    $margin_bottom = floatval($settings['margin']['bottom']);
    $margin_left = floatval($settings['margin']['left']);
    $margin_right = floatval($settings['margin']['right']);
    $binding = floatval($settings['bindingMargin']);
    
    // Create PDF
    $mpdf = new Mpdf([
        'format' => $format,
        'margin_top' => $margin_top,
        'margin_bottom' => $margin_bottom,
        'margin_left' => $margin_left + $binding,
        'margin_right' => $margin_right,
        'tempDir' => __DIR__ . '/tmp'
    ]);
    
    // Build HTML content
    $html = '<html><head><meta charset="UTF-8"></head><body>';
    $html .= '<div style="text-align: center; padding: 20px;">';
    $html .= '<h1>📚 Book Export</h1>';
    $html .= '<p>Export Date: ' . date('Y-m-d H:i:s') . '</p>';
    $html .= '<p><strong>Settings:</strong></p>';
    $html .= '<ul style="text-align: left; display: inline-block;">';
    $html .= '<li>Paper Size: ' . htmlspecialchars($paperSize) . '</li>';
    $html .= '<li>Color Profile: ' . htmlspecialchars($settings['colorProfile']) . '</li>';
    $html .= '<li>Double-Sided: ' . ($settings['duplex'] ? 'Yes' : 'No') . '</li>';
    $html .= '<li>Margins: ' . $margin_top . 'mm top, ' . $margin_bottom . 'mm bottom</li>';
    $html .= '<li>Binding Margin: ' . $binding . 'mm</li>';
    if ($settings['cropMarks']) $html .= '<li>✓ Crop Marks Enabled</li>';
    if ($settings['bleedMarks']) $html .= '<li>✓ Bleed Marks Enabled</li>';
    $html .= '</ul>';
    $html .= '</div>';
    
    // Add content pages
    for ($i = 1; $i <= 5; $i++) {
        $html .= '<div style="page-break-after: always; padding: 40px; border: 1px solid #ddd; min-height: 500px;">';
        $html .= '<p>Sample Content Page ' . $i . '</p>';
        $html .= '<p>This is a sample page to demonstrate the export functionality.</p>';
        $html .= '</div>';
    }
    
    $html .= '</body></html>';
    
    $mpdf->WriteHTML($html);
    $mpdf->Output('book-export.pdf', 'D');
    
} catch (Exception $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'PDF generation failed: ' . $e->getMessage()]);
    exit;
}

// Fallback function for generating simple PDF without mPDF
function generateSimplePDF($settings) {
    $pdf_content = generateBasicPDF($settings);
    echo $pdf_content;
}

function generateBasicPDF($settings) {
    // Simple PDF generation without external library
    $paperSize = $settings['paperSize'];
    $timestamp = date('Y-m-d H:i:s');
    
    $pdf = "%PDF-1.4\n";
    $pdf .= "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n";
    $pdf .= "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n";
    $pdf .= "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n";
    
    $stream = "BT\n/F1 24 Tf\n100 700 Td\n(Book Export) Tj\nET\n";
    $stream .= "BT\n/F1 12 Tf\n100 650 Td\n(Generated: " . $timestamp . ") Tj\nET\n";
    $stream .= "BT\n/F1 12 Tf\n100 620 Td\n(Paper Size: " . $paperSize . ") Tj\nET\n";
    $stream .= "BT\n/F1 12 Tf\n100 590 Td\n(Color Profile: " . $settings['colorProfile'] . ") Tj\nET\n";
    
    $pdf .= "4 0 obj\n<< /Length " . strlen($stream) . " >>\nstream\n" . $stream . "endstream\nendobj\n";
    $pdf .= "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n";
    $pdf .= "xref\n0 6\n0000000000 65535 f\n0000000009 00000 n\n0000000058 00000 n\n0000000115 00000 n\n0000000273 00000 n\n0000000400 00000 n\n";
    $pdf .= "trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n500\n%%EOF";
    
    return $pdf;
}
?>
