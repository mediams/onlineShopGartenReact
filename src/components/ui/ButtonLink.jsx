import React from "react";
import { Link } from "react-router";

export default function ButtonLink({ type, text, className, to, onClick }) {
  return (
    <>
      {type === "button" ? (
        <button onClick={onClick} className={className}>
          {text}
        </button>
      ) : (
        <Link className={className} to={to} text={text}>
          {text}
        </Link>
      )}
    </>
  );
}
