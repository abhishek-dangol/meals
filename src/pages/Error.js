import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="error-page section">
      <div className="error-container">
        <h1>Oops! You have a hit a dead end!!!</h1>

        <Link to="/" className="btn btn-primary">
          Back To Home Page
        </Link>
      </div>
    </section>
  );
};

export default Error;
