import React, { useState } from 'react'

const Course = ( {N, index, name, rank_percentile, sentiment_percentile, rank, rating, instructors, course_name, OPACITYLIMIT} ) => {

    const [clicked, setClicked] = useState(false);
    const opacity = (index > OPACITYLIMIT ) ? 2 - (index / OPACITYLIMIT) ** 2 : 1;

    return (
        <a style = {{opacity: opacity}} className='hoverLink' onClick={() => setClicked(!clicked)}>
            <div>
                <p><b>{name + " - " + course_name}</b></p>
                {clicked && (
                    <div>
                        <h5><b>Rank: </b>{rank + "/" + N}</h5>
                        <h5><b>Rating Percentile: </b>{rank_percentile}</h5>
                        <h5><b>Sentiment Percentile: </b>{sentiment_percentile}</h5>
                    </div>
                )}
            </div>
        </a>
    )
}

export default Course