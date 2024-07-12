import React from 'react';
import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlay} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Hero = ({ movies }) => {
  const navigate = useNavigate();

  function reviews(movieId) {
    navigate(`/Reviews/${movieId}`);
  }

  return (
    <div className="carousel-container">
      <Carousel>
        {movies?.map((movie) => {
          console.log(movie)
          return (
            <Paper key={movie.imdbId}>
              <div className="card-container">
                <div
                  className="movie-card"
                  style={{ backgroundImage: `url(${movie.backdrops[1]})` }}
                >
                  <div className="detail">
                    <div className="movie-poster">
                      <img src={movie.poster} alt="" />
                    </div>
                    <div className="title">
                      <h4>{movie.title}</h4>
                    </div>
                    <div className="movie-buttons-container">
                    <Link to={movie.trailerLink ? `/Trailer/${movie.trailerLink.slice(-11)}` : '/default-path'} target='_blank'>
                        <div className="play-button-icon-container">
                          <FontAwesomeIcon
                            className="play-button-icon"
                            icon={faPlay} 
                          />
                        </div>
                      </Link>
                      <div className="movie-review-button-container">
                        <Button variant="info" onClick={() => reviews(movie.imdbId)}>
                          Reviews
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          );
        })}
      </Carousel>
    </div>
    
  );
};

export default Hero;
