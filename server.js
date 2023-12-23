const express = require('express');
const torrentStream = require('torrent-stream');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 80;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/download', (req, res) => {
    const magnetLink = req.body.magnetLink;
    const engine = torrentStream(magnetLink);

    engine.on('ready', () => {
        const files = engine.files.map(file => ({
            name: file.name,
            length: file.length
        }));

        res.json(files);
    });
});

app.get('/download/:fileName', (req, res) => {
    console.log('Download request received:', req.params.fileName);

    const magnetLink = req.query.magnetLink;
    const fileName = req.params.fileName;

    const engine = torrentStream(magnetLink);

    engine.on('ready', () => {
        const file = engine.files.find(f => f.name === fileName);

        if (!file) {
            return res.status(404).send('File not found in the torrent.');
        }

        res.setHeader('Content-disposition', 'attachment; filename=' + encodeURIComponent(fileName));
        res.setHeader('Content-type', 'application/octet-stream');

        const fileStream = file.createReadStream();
        fileStream.pipe(res);

        fileStream.on('end', () => {
            engine.destroy();
            console.log('Download completed:', fileName);
            // Perform cleanup here
    setTimeout(() => {
        engine.remove(() => {
            console.log('Engine removed:', fileName);
        });
    }, 5000); // Adjust the timeout as needed
    
        });
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
