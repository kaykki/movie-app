import React from 'react'

function MovieCard({ title, img }) {
  return (
    <div>
        <img src={img} alt={title}/>
        <h3>{title}</h3>
    </div>
  )
}

export default MovieCard