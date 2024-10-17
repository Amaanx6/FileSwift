$(document).ready(function() {
    const dropArea = $('#drop-area');
    const fileInput = $('#file-input');
    const selectFileButton = $('#select-file');
    const selectedFileDiv = $('#selected-file');
    const compressionOptions = $('#compression-options');
    const compressButton = $('#compress-button');
    let selectedFile = null;

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.on(eventName, preventDefaults);
        document.body.addEventListener(eventName, preventDefaults);
    });

    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.on(eventName, highlight);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.on(eventName, unhighlight);
    });

    // Handle dropped files
    dropArea.on('drop', handleDrop);

    selectFileButton.click(function() {
        fileInput.click();
    });

    fileInput.change(handleFiles);

    compressButton.click(compressPDF);

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight() {
        dropArea.addClass('bg-blue-100');
    }

    function unhighlight() {
        dropArea.removeClass('bg-blue-100');
    }

    function handleDrop(e) {
        const dt = e.originalEvent.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        if (files instanceof FileList) {
            files = Array.from(files);
        } else if (files instanceof Event) {
            files = Array.from(fileInput[0].files);
        }
        
        if (files.length > 0 && files[0].type === 'application/pdf') {
            selectedFile = files[0];
            selectedFileDiv.text(`Selected file: ${selectedFile.name}`);
            compressionOptions.removeClass('hidden');
            compressButton.removeClass('hidden');
        }
    }

    async function compressPDF() {
        if (!selectedFile) {
            alert('Please select a PDF file first.');
            return;
        }

        const compressionLevel = $('#compression-level').val();
        const pdfBytes = await selectedFile.arrayBuffer();
        const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);

        // Simulate compression by reducing image quality
        const pages = pdfDoc.getPages();
        for (const page of pages) {
            const { width, height } = page.getSize();
            const form = page.getForm();
            const fields = form.getFields();

            for (const field of fields) {
                if (field instanceof PDFLib.PDFImage) {
                    const image = field.getImage();
                    const jpgImage = await pdfDoc.embedJpg(image.getData());
                    page.drawImage(jpgImage, {
                        x: field.x,
                        y: field.y,
                        width: field.width,
                        height: field.height,
                        opacity: 1 - (compressionLevel * 0.3), // Reduce opacity based on compression level
                    });
                }
            }
        }

        const compressedPdfBytes = await pdfDoc.save();
        const blob = new Blob([compressedPdfBytes], { type: 'application/pdf' });
        saveAs(blob, `compressed_${selectedFile.name}`);

        alert('PDF compressed successfully!');
    }
});