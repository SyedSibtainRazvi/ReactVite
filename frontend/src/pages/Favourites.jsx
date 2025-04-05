import React from "react";
import "../css/Favourites.css";

const Favourites = () => {
  return (
    <div className="favourites-empty">
      <h2>No favourites movies yet</h2>
      <p>
        Start adding movies to your favourites and they will start appearing
        here
      </p>
    </div>
  );
};

export default Favourites;
