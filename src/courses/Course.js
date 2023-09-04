import React, { useState } from 'react'

const Course = ( {N, name, rank_percentile, sentiment_percentile, rank, rating, instructors, course_name, OPACITYLIMIT} ) => {

    const [clicked, setClicked] = useState(false);
    const opacity = (rank > OPACITYLIMIT ) ? 2 - (rank / OPACITYLIMIT) ** 2 : 1;

    return (
        <a style = {{opacity: opacity}} className='hoverLink' onClick={() => setClicked(!clicked)}>
            <p>{name + " - " + course_name}</p>
            {clicked && (
                <div>
                    <p><b>Rank: </b>{rank + "/" + N}</p>
                    <p><b>Rating Percentile: </b>{rank_percentile}</p>
                    <p><b>Sentiment Percentile: </b>{sentiment_percentile}</p>
                </div>
            )}
        </a>
    )
}

export default Course