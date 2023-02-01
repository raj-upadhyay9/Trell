import React from "react";
import ReactStars from "react-rating-stars-component";

function Rating({ value, text, color }) {
  console.log(value, "rating");
  return (
    <div className="rating">
      <ReactStars
        value={{ value }}
        edit={false}
        isHalf={true}
        count={5}
        activeColor={{ color }}
      />
      <span>{text && text}</span>
    </div>
  );
}

export default Rating;
