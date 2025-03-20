import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Rating = ({ value }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;
    if (value >= starValue) {
      return <FaStar key={index} className="text-yellow-400" />;
    } else if (value >= starValue - 0.5) {
      return <FaStarHalfAlt key={index} className="text-yellow-400" />;
    } else {
      return <FaStar key={index} className="text-gray-300" />;
    }
  });

  return <div className="flex">{stars}</div>;
};

export default Rating;