$(document).ready(function() {
    const tools = [
        { name: 'Merge PDF', icon: 'https://cdn-icons-png.flaticon.com/128/8422/8422166.png', description: 'Combine PDFs in the order you want with the easiest PDF merger available.', action: 'mergePDF' },
        { name: 'Split PDF', icon: 'https://cdn-icons-png.flaticon.com/128/4126/4126498.png', description: 'Separate one page or a whole set for easy conversion into independent PDF files.', action: 'splitPDF' },
        { name: 'Compress PDF', icon: 'https://cdn-icons-png.flaticon.com/128/3143/3143460.png', description: 'Reduce file size while optimizing for maximal PDF quality.', action: 'compressPDF' },
        { name: 'PDF to Word', icon: 'https://cdn-icons-png.flaticon.com/128/9326/9326351.png', description: 'Easily convert your PDF to Word document editable and reusable.', action: 'pdfToWord' },
        { name: 'PDF to PowerPoint', icon: 'https://cdn-icons-png.flaticon.com/128/9326/9326462.png', description: 'Turn your PDF into an editable PowerPoint presentation.', action: 'pdfToPowerPoint' },
        { name: 'PDF to Excel', icon: 'https://cdn-icons-png.flaticon.com/128/9326/9326463.png', description: 'Pull data straight from PDFs into Excel spreadsheets in a few seconds.', action: 'pdfToExcel' },
        { name: 'Word to PDF', icon: 'https://cdn-icons-png.flaticon.com/128/9326/9326445.png', description: 'Make DOC and DOCX files easy to read by converting them to PDF.', action: 'wordToPDF' },
        { name: 'PowerPoint to PDF', icon: 'https://cdn-icons-png.flaticon.com/128/9326/9326464.png', description: 'Make PPT and PPTX slides easy to view by converting them to PDF.', action: 'powerPointToPDF' },
        { name: 'Excel to PDF', icon: 'https://cdn-icons-png.flaticon.com/128/9326/9326465.png', description: 'Make EXCEL spreadsheets easy to read by converting them to PDF.', action: 'excelToPDF' },
        { name: 'Edit PDF', icon: 'https://cdn-icons-png.flaticon.com/128/2919/2919592.png', description: 'Add text, images, shapes or freehand annotations to a PDF document.', action: 'editPDF' },
        { name: 'PDF to JPG', icon: 'https://cdn-icons-png.flaticon.com/128/9326/9326447.png', description: 'Convert each PDF page into a JPG or extract all images contained in a PDF.', action: 'pdfToJPG' },
        { name: 'JPG to PDF', icon: 'https://cdn-icons-png.flaticon.com/128/9326/9326622.png', description: 'Convert JPG images to PDF in seconds. Easily adjust orientation and margins.', action: 'jpgToPDF' },
    ];

    const toolsContainer = $('#tools-container');

    tools.forEach(tool => {
        const toolCard = $(`
            <div class="tool-card bg-white rounded-lg shadow-lg p-6 flex flex-col animate__animated animate__fadeIn">
                <div class="flex items-center mb-4">
                    <img src="${tool.icon}" alt="${tool.name}" class="tool-icon mr-4">
                    <h3 class="text-xl font-semibold">${tool.name}</h3>
                </div>
                <p class="text-gray-600 flex-grow">${tool.description}</p>
                <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors use-tool-btn" data-action="${tool.action}">Use Tool</button>
            </div>
        `);

        toolsContainer.append(toolCard);
    });

    // Mobile menu toggle
    $('#mobile-menu-button').click(function() {
        $('#mobile-menu').toggleClass('hidden');
    });

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 100
        }, 500);
    });

    // Show loading overlay when a tool is used
    $(document).on('click', '.use-tool-btn', function() {
        const action = $(this).data('action');
        window[action](); // Call the function with the name stored in the data-action attribute
    });
});