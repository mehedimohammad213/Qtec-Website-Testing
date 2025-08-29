const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

async function generatePDFReport() {
  console.log("Starting PDF generation...");

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Read the HTML file
  const htmlPath = path.join(
    __dirname,
    "..",
    "QTEC-Website-Testing-Report-2024.html"
  );
  const htmlContent = fs.readFileSync(htmlPath, "utf8");

  await page.setContent(htmlContent, {
    waitUntil: "networkidle0",
  });

  // Set viewport for better rendering
  await page.setViewport({
    width: 1200,
    height: 800,
    deviceScaleFactor: 1,
  });

  // Generate PDF
  const pdfPath = path.join(
    __dirname,
    "..",
    "QTEC-Website-Testing-Report-2025-Updated.pdf"
  );

  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
    margin: {
      top: "20mm",
      right: "20mm",
      bottom: "20mm",
      left: "20mm",
    },
    displayHeaderFooter: true,
    headerTemplate:
      '<div style="font-size: 10px; margin-left: 20px; margin-right: 20px; width: 100%; text-align: center;"><span class="title"></span></div>',
    footerTemplate:
      '<div style="font-size: 10px; margin-left: 20px; margin-right: 20px; width: 100%; text-align: center;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
  });

  console.log(`PDF generated successfully: ${pdfPath}`);

  await browser.close();
}

// Run the script
generatePDFReport().catch(console.error);
