import React, { useState } from 'react';
import {QrReader} from 'react-qr-reader';

const QRScanner = ({ handleScan }) => {
    const [error, setError] = useState(null);

    const handleScanResult = (data) => {
        if (data) {
            try {
                // Call the handleScan function passed as prop
                handleScan(data);
            } catch (error) {
                console.error('Error while handling scan result:', error);
            }
        }
    };

    const handleError = (err) => {
        console.error('Error while scanning QR code:', err);
        setError(err);
    };

    return (
        <div>
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScanResult}
                style={{ width: '100%' }}
            />
            {error && <p>{error.message}</p>}
        </div>
    );
};

export default QRScanner;
