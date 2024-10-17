$(document).ready(function() {
    const dropArea = $('#drop-area');
    const fileInput = $('#file-input');
    const selectFileButton = $('#select-file');
    const selectedFileDiv = $('#selected-file');
    const splitOptions = $('#split-options');
    const splitButton = $('#split-button');
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

    splitButton.click(splitPDF);

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
            splitOptions.removeClass('hidden');
            splitButton.removeClass('hidden');
        }
    }

    async function splitPDF() {
        if (!selectedFile) {
            alert('Please select a PDF file first.');
            return;
        }

        const pdfBytes = await selectedFile.arrayBuffer();
        const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
        const pageCount = pdfDoc.getPageCount();

        const splitOption = $('input[name="split-option"]:checked').val();
        let pagesToSplit = [];

        if (splitOption === 'all') {
            pagesToSplit = Array.from({ length: pageCount }, (_, i) => i);
        } else if (splitOption === 'range') {
            const rangeInput = $('#page-range').val();
            const ranges = rangeInput.split(',').map(range => range.trim());
            ranges.forEach(range => {
                const [start, end] = range.split('-').map(num => parseInt(num) - 1);
                for (let i = start; i <= (end || start); i++) {
                    if (i >= 0 && i < pageCount) {
                        pagesToSplit.push(i);
                    }
                }
            });
        }

        for (const pageNum of pagesToSplit) {
            const newPdf = await PDFLib.PDFDocument.create();
            const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageNum]);
            newPdf.addPage(copiedPage);

            const pdfBytes = await newPdf.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            saveAs(blob, `page_${pageNum + 1}.pdf`);
        }

        alert('PDF split successfully!');
    }
});