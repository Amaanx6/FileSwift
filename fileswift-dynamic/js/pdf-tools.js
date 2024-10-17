// Load the PDF.js library
pdfjsLib.GlobalWorkerOptions.workerSrc = 
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js';

function showLoading() {
    $('body').append('<div class="loading-overlay"><div class="loading-spinner"></div></div>');
}

function hideLoading() {
    $('.loading-overlay').remove();
}

function showResult(message) {
    alert(message);
}

async function mergePDF() {
    showLoading();
    try {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.multiple = true;
        fileInput.accept = '.pdf';

        fileInput.onchange = async function() {
            const files = Array.from(fileInput.files);
            const pdfDoc = await PDFLib.PDFDocument.create();

            for (const file of files) {
                const pdfBytes = await file.arrayBuffer();
                const pdf = await PDFLib.PDFDocument.load(pdfBytes);
                const copiedPages = await pdfDoc.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => pdfDoc.addPage(page));
            }

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'merged.pdf';
            link.click();

            hideLoading();
            showResult('PDFs merged successfully!');
        };

        fileInput.click();
    } catch (error) {
        console.error('Error merging PDFs:', error);
        hideLoading();
        showResult('Error merging PDFs. Please try again.');
    }
}

async function splitPDF() {
    showLoading();
    try {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.pdf';

        fileInput.onchange = async function() {
            const file = fileInput.files[0];
            const pdfBytes = await file.arrayBuffer();
            const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
            const pageCount = pdfDoc.getPageCount();

            for (let i = 0; i < pageCount; i++) {
                const newPdf = await PDFLib.PDFDocument.create();
                const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
                newPdf.addPage(copiedPage);

                const newPdfBytes = await newPdf.save();
                const blob = new Blob([newPdfBytes], { type: 'application/pdf' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `page_${i + 1}.pdf`;
                link.click();
            }

            hideLoading();
            showResult(`PDF split into ${pageCount} pages successfully!`);
        };

        fileInput.click();
    } catch (error) {
        console.error('Error splitting PDF:', error);
        hideLoading();
        showResult('Error splitting PDF. Please try again.');
    }
}

function compressPDF() {
    showLoading();
    setTimeout(() => {
        hideLoading();
        showResult('PDF compressed successfully! (This is a simulated action)');
    }, 2000);
}

function pdfToWord() {
    showLoading();
    setTimeout(() => {
        hideLoading();
        showResult('PDF converted to Word successfully! (This is a simulated action)');
    }, 2000);
}

function pdfToPowerPoint() {
    showLoading();
    setTimeout(() => {
        hideLoading();
        showResult('PDF converted to PowerPoint successfully! (This is a simulated action)');
    }, 2000);
}

function pdfToExcel() {
    showLoading();
    setTimeout(() => {
        hideLoading();
        showResult('PDF converted to Excel successfully! (This is a simulated action)');
    }, 2000);
}

function wordToPDF() {
    showLoading();
    setTimeout(() => {
        hideLoading();
        showResult('Word document converted to PDF successfully! (This is a simulated action)');
    }, 2000);
}

function powerPointToPDF() {
    showLoading();
    setTimeout(() => {
        hideLoading();
        showResult('PowerPoint presentation converted to PDF successfully! (This is a simulated action)');
    }, 2000);
}

function excelToPDF() {
    showLoading();
    setTimeout(() => {
        hideLoading();
        showResult('Excel spreadsheet converted to PDF successfully! (This is a simulated action)');
    }, 2000);
}

function editPDF() {
    showLoading();
    setTimeout(() => {
        hideLoading();
        showResult('PDF edited successfully! (This is a simulated action)');
    }, 2000);
}

async function pdfToJPG() {
    showLoading();
    try {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.pdf';

        fileInput.onchange = async function() {
            const file = fileInput.files[0];
            const pdfBytes = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: pdfBytes }).promise;

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const scale = 1.5;
                const viewport = page.getViewport({ scale });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({ canvasContext: context, viewport }).promise;

                const imgData = canvas.toDataURL('image/jpeg');
                const link = document.createElement('a');
                link.href = imgData;
                link.download = `page_${i}.jpg`;
                link.click();
            }

            hideLoading();
            showResult(`PDF converted to ${pdf.numPages} JPG images successfully!`);
        };

        fileInput.click();
    } catch (error) {
        console.error('Error converting PDF to JPG:', error);
        hideLoading();
        showResult('Error converting PDF to JPG. Please try again.');
    }
}

function jpgToPDF() {
    showLoading();
    setTimeout(() => {
        hideLoading();
        showResult('JPG converted to PDF successfully! (This is a simulated action)');
    }, 2000);
}