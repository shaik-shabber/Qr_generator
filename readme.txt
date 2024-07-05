QR Code Generator
Overview
The QR Code Generator is a web application built to dynamically generate QR codes based on user input. It provides a simple interface where users can enter text or a URL, and instantly obtain a QR code image that can be shared or downloaded. This project combines frontend development using React.js with a backend API built using Python Flask.

Technologies Used
Frontend
React.js: Used for building the frontend user interface and managing state efficiently.
Axios: A promise-based HTTP client for making asynchronous requests to the backend API.
HTML & CSS: Basic markup and styling for structuring and presenting the web application.
JavaScript (ES6+): Enhanced functionality including event handling and asynchronous operations.
Backend
Python: Backend logic implemented using Python for generating QR codes based on user input.
Flask: A lightweight Python web framework used to create RESTful APIs to handle requests from the frontend.
Flask-CORS: Used to enable Cross-Origin Resource Sharing (CORS) to allow frontend and backend communication from different origins during development.
qrcode: Python library for generating QR codes.
Features
QR Code Generation: Users can input text or a URL, and the application dynamically generates a QR code image.
Image Download: Allows users to download generated QR codes for offline use.
Clipboard Integration: Enables users to easily copy generated QR code images to their clipboard for sharing.