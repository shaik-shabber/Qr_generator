import React, { useState } from 'react';
import axios from 'axios';
import './qr_g.css';

const QRCodeGenerator = () => {
  const [content, setContent] = useState(''); // State for text content
  const [qrCode, setQRCode] = useState('');   // State to store QR code image source
  const [error, setError] = useState('');     // State to handle errors

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/generate_qr', { url: content }, {
        responseType: 'blob', // Ensure response is treated as a blob
      });

      const qrCodeBase64 = await convertBlobToBase64(response.data);
      const qrCodeSrc = `data:image/png;base64,${qrCodeBase64}`;

      setQRCode(qrCodeSrc);
      setError('');
    } catch (error) {
      console.error('Error generating QR code:', error);
      setError('Failed to generate QR code. Please try again.');
      setQRCode('');
    }
  };

  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result.split(',')[1]);
      };
      reader.readAsDataURL(blob);
    });
  };

  const handleContentChange = (event) => {
    const { value } = event.target;
    setContent(value);
    setQRCode('');
    setError('');
  };

  const handleCopyQRCode = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = new Image();
    image.src = qrCode;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);

      canvas.toBlob((blob) => {
        navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob
          })
        ]).then(() => {
          alert('QR code image copied to clipboard!');
        }).catch((error) => {
          console.error('Failed to copy QR code image:', error);
          alert('Failed to copy QR code image. Please try again.');
        });
      });
    };
  };

  return (
    <div className="qrcode-container">
      <h2>QR Code Generator</h2>
      <form className="qrcode-form" onSubmit={handleSubmit}>
        <label>
          Enter Text to Generate QR Code:
          <input
            type="text"
            value={content}
            onChange={handleContentChange}
            required
            placeholder="Enter text here"
          />
        </label>
        <button type="submit">Generate QR Code</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      {qrCode && (
        <div className="qrcode-generated">
          <h3>Generated QR Code:</h3>
          <img src={qrCode} alt="Generated QR Code" className="qr-image" />
          <button className="share-button" onClick={handleCopyQRCode}>Share the QR code</button>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
