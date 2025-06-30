import { useState } from "react";
import PropTypes from "prop-types";

App.propTypes = {
  maxRating: PropTypes.number,
  size: PropTypes.number,
  color: PropTypes.string,
  gap: PropTypes.number,
  className: PropTypes.string,
  message: PropTypes.array,
  defaultRating: PropTypes.number,
};
export default function App({
  maxRating = 5,
  size = 48,
  color = "#fcc419",
  className = "",
  message = [],
  defaultRating = 0,
  onStarRating,
}) {
  const styleContainer = {
    display: "flex",
    alignItems: "center",
    gap: `${size / 2}px`,
    height: `${size + 5}px`,
    color,
  };

  const StartContainer = {
    display: "flex",
    alignItems: "center",
    gap: `${size / 3}px`,
    height: `${size}px`,
  };

  const textStyle = {
    lineheight: "",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);
  onStarRating(rating);
  function hndleRating(rating) {
    setRating(rating);
  }
  return (
    <div style={styleContainer} className="className">
      <div style={StartContainer}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Start
            key={i}
            onRating={() => hndleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            color={color}
            size={size}
          />
        ))}
      </div>
      <div style={textStyle}>
        {message.length === maxRating
          ? message[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </div>
    </div>
  );
}

function Start({ onRating, full, onHoverIn, onHoverOut, size, color }) {
  const starStyle = {
    // display: "block",
    width: `${size / 1.5}px`,
    height: `${size / 1.5}px`,
    cursor: "pointer",
    color,
  };

  return (
    <span
      style={starStyle}
      role="button"
      onClick={onRating}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
      )}
    </span>
  );
}
