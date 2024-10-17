#!/bin/bash

# Step 1: Initialize the Git repository
git init

# Step 2: Set up Git config (replace with your GitHub username and email)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Step 3: Create the README.md file
cat <<EOT >> README.md
# FileSwift

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/Amaanx6/FileSwift)](https://github.com/Amaanx6/FileSwift/issues)

FileSwift is a versatile file management tool designed to handle a wide range of PDF and image operations. It allows users to view, edit, convert, merge, and compress files with ease. Built to be fast, user-friendly, and efficient, FileSwift is perfect for personal or professional use.

## Features

- **View and Edit PDFs**: Seamlessly open and edit PDF documents.
- **PDF to Image Conversion**: Convert PDFs to PNG, JPG, and other image formats.
- **Image to PDF Conversion**: Merge multiple images into a single PDF.
- **Merge PDFs**: Combine multiple PDFs into a single file.
- **Compress PDFs**: Reduce the size of PDF files without compromising quality.
- **PDF to Microsoft Word/Excel**: Convert PDF files to Word (.docx) or Excel (.xlsx) formats.
- **Word/Excel to PDF**: Convert Microsoft Word or Excel documents into PDF.

## Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/Amaanx6/FileSwift.git
   \`\`\`
2. Navigate to the project directory:
   \`\`\`bash
   cd FileSwift
   \`\`\`
3. Install the required dependencies:
   \`\`\`bash
   # Example for Node.js projects (adapt if different):
   npm install
   \`\`\`

## Usage

1. Start the application:
   \`\`\`bash
   npm start
   \`\`\`
2. Use the tool to manage PDFs and images with the features listed above.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch: \`git checkout -b feature-name\`.
3. Make your changes and commit them: \`git commit -m 'Add some feature'\`.
4. Push to the branch: \`git push origin feature-name\`.
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
EOT

# Step 4: Add and commit the README.md file
git add README.md
git commit -m "Add README.md"

# Step 5: Create a main branch
git branch -M main

# Step 6: Add the remote GitHub repository (replace with your GitHub URL)
git remote add origin https://github.com/Amaanx6/FileSwift.git

# Step 7: Push the changes to GitHub
git push -u origin main
