import React from 'react';

export default function Repositorio({ match }) {
  return (
    <h1>
      {decodeURIComponent(match.params.repositorio)}
    </h1>
  );
}
