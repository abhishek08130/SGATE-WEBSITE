const express = require('express');
const jwt = require('jsonwebtoken');
const QRCode = require('qrcode');
const cors = require('cors');  // Add this line

const app = express();
const PORT = 3000;

// Use the CORS middleware
app.use(cors());  // Add this line

// Secret key for JWT

const SECRET_KEY = 'your-secret-key';

// Route to generate a token and return it as a QR code
app.get('/generate-token', (req, res) => {
    const token = jwt.sign({ userId: 12345 }, SECRET_KEY, { expiresIn: '5m' });
    QRCode.toDataURL(token, (err, url) => {
        if (err) {
            res.status(500).send('Error generating QR code');
        } else {
            res.send(url); // Send QR code data as a string (base64)
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
