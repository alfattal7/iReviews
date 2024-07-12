import React, { useState, useEffect, useRef } from 'react';
import api_Ngrok from '../../api_Ngrok/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ReviewFormular from '../reviewFormular/ReviewFormular';
import QRCode from 'qrcode.react';
import './reviews.css';
import { Html5QrcodeScanner } from "html5-qrcode";
import Emoji from '../emoji/Emoji';


const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
    const revText = useRef();
    const params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId).then(() => {
            
        });
    }, [movieId, getMovieData]);

    const addReview = async (e) => {
        e.preventDefault();
        const rev = revText.current;

        try {
            const response = await api_Ngrok.post('/api/comp/reviews', {
                reviewsBody: rev.value,
                imdbId: movieId,
            });

            const updatedReviews = [...reviews, { body: rev.value }];

            rev.value = '';

            setReviews(updatedReviews);
        } catch (err) {
            console.error(err);
        }
    };

    const [scaleValues, setScaleValues] = useState({});
    const [scannedCode, setScannedCode] = useState('');
    const [uploadedCode, setUploadedCode] = useState('');

    const handleChangeScale = (genre, value) => {
        setScaleValues((prevState) => ({
            ...prevState,
            [genre]: value,
        }));
    };

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedCode(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const compareCodes = () => {
        if (uploadedCode === generateQRData()) {
            alert('QR codes match!');
        } else {
            alert('QR codes do not match!');
        }
    };

    const generateQRData = () => {
        return Object.keys(scaleValues)
            .map((genre) => `${genre}: ${scaleValues[genre]}`)
            .join('\n');
    };
    const startScan = () => {
        const config = { fps: 10, qrbox: { width: 300, height: 300 } };
        const html5QrCode = new Html5QrcodeScanner(
            "reader",
            config,
             false
        );
        const qrCodeSuccessCallback = (decodedText, decodedResult) => { 
            if (decodedText === generateQRData()) {
                alert("QR codes match! "+decodedText);
            } else {
                alert("QR codes do not match! "+decodedText);
            }
            html5QrCode.stop().then(() => console.log("QR Scanning stopped"));
        };
        html5QrCode.render(qrCodeSuccessCallback);
    };

    const renderGenresWithScale = () => {
        if(!movie || !movie.genres){
            return <div> Loading genres </div>
        }
        return (
            <div>
                {movie.genres.map((genre, index) => (
                    <Row key={index} className="genre-row">
                        <Col className="genre-label">{genre}</Col>
                        <Col>
                            <select
                                className="genre-select"
                                onChange={(e) =>
                                    handleChangeScale(genre, e.target.value)
                                }
                                value={scaleValues[genre] || ''}
                            >
                                {Array.from({ length: 10 }, (_, i) => i + 1).map(
                                    (value) => (
                                        <option key={value} value={value}>
                                            {value}
                                        </option>
                                    )
                                )}
                            </select>
                        </Col>
                    </Row>
                ))}
                <Row className="genre-row">
                    <Col>
                        <QRCode value={generateQRData()} />
                        <a
                            className="download-link"
                            href={`data:image/png;base64,${generateQRData()}`}
                            download="genres_qr_code.png"
                        >
                            Download QR Code 📥
                        </a>
                    </Col>
                </Row>
            </div>
        );
    };

    return (
        <Container>
            <Row>
                <Col>
                <Emoji symbol=" The Reviews 🤏🏻"/>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>
                    <>
                        <Row>
                            <Col>
                                <ReviewFormular
                                    handlePost={addReview}
                                    revText={revText}
                                    labelText="Write a Review? ✏️"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                    {renderGenresWithScale()}
                    <Row>
                        
                       {/*     <Button variant="primary" onClick={compareCodes} disabled={!uploadedCode}>
                                Compare QR Codes
                            </Button>
                        <br/>
                        <Col className='file-input'>
                            <input type="file" accept="image/*" onChange={handleUpload} />
                        </Col>
                        <Col className="btn.col">
                            <Button variant="primary" onClick={() => setUploadedCode('')}>
                                Upload QR Code
                            </Button>
                            </Col>*/}
                         <Button  variant="primary" onClick={startScan}>Scan QR Code</Button>
                        <Col id="reader" /> 
                    </Row>
                    <h5> The Reviews 🗞</h5>
                    {reviews?.map((r, index) => (
                        <React.Fragment key={index}>
                            <Row>
                                <Col>{r.body}</Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </React.Fragment>
                    ))}
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
            
    
        
        
        </Container>
    );
};

export default Reviews;
