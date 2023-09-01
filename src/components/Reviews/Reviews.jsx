import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchMovieReviews } from 'service/Api';

const Reviews = () => {
  const { moveId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const movieReviews = async () => {
      try {
        const response = await fetchMovieReviews(moveId);
        setReviews(response);
      } catch (erorr) {
        console.log(erorr);
      }
    };
    movieReviews();
  }, [moveId]);

  return (
    <>
      {reviews.length !== 0 && (
        <div>
          <h2>Movie Reviews</h2>
          <ul>
            {reviews.map(review => (
              <li key={review.id}>
                <p>{review.author}</p>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {reviews.length === 0 && (
        <div>We don't have any reviews for this movie.</div>
      )}
    </>
  );
};

export default Reviews;
