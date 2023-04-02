import React from "react";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";

export default function NotFound(props) {
  useWebsiteTitle('404');
  return (
    <div>
      <h2>404</h2>
      <p>Nie znaleziono takiej strony.</p>
    </div>
  );
}