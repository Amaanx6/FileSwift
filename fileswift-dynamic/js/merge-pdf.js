$(document).ready(function() {
    const dropArea = $('#drop-area');
    const fileInput = $('#file-input');
    const selectFilesButton = $('#select-files');
    const selectedFilesDiv = $('#selected-files');
    const mergeButton = $('#merge-button');
    let selectedFiles = [];

   
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

    selectFilesButton.click(function() {
        fileInput.click();
    });

    fileInput.change(handleFiles);

    mergeButton.click(mergePDFs);

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
        
        files.forEach(file => {
            if (file.type === 'application/pdf') {
                selectedFiles.push(file);
                const fileDiv = $('<div>').text(file.name).addClass('mt-2');
                selectedFilesDiv.append(fileDiv);
            }
        });

        if (selectedFiles.length > 0) {
            mergeButton.removeClass('hidden');
        }
    }

    async function mergePDFs() {
        const pdfDoc = await PDFLib.PDFDocument.create();
        
        for (const file of selectedFiles) {
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
    }
});
