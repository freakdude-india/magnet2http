const express = require('express');
const torrentStream = require('torrent-stream');
const fileUpload = require('express-fileupload');

const app = express();

// Enable file uploads
app.use(fileUpload());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve the frontend
app.use(express.static('public'));

// Handle file uploads
app.post('/upload', (req, res) => {
  const magnetLink = req.body.magnetLink;

  // Create a torrent engine
  const engine = torrentStream(magnetLink);

  engine.on('ready', () => {
    // Get a list of files
    const files = engine.files.map((file, index) => ({
      index,
      name: file.name,
      length: file.length
    }));

    // Send the list of files to the frontend
    res.json({ files });
  });
});

// Add a new route for downloading selected files
app.get('/download', (req, res) => {
  const selectedFiles = req.query.selectedFiles;
  const magnetLink = req.query.magnetLink;

  if (!selectedFiles || !magnetLink) {
    res.send('No files selected for download.');
    return;
  }

  const selectedFileIndices = selectedFiles.split(',').map(index => parseInt(index, 10));

  // Create a torrent engine
  const engine = torrentStream(magnetLink);

  engine.on('ready', () => {
    // Stream selected files for download
    selectedFileIndices.forEach(index => {
      const selectedFile = engine.files[index];
      const stream = selectedFile.createReadStream();
      res.setHeader('Content-disposition', `attachment; filename=${selectedFile.name}`);
      stream.pipe(res);
    });
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
