import React, { useState } from 'react'

const Instructor = ( {N, rank, instructor, current_classes, rating, OPACITYLIMIT} ) => {

    const [clicked, setClicked] = useState(false);
    const opacity = (rank > OPACITYLIMIT ) ? 2 - (rank / OPACITYLIMIT) ** 2 : 1;

    return (
        <a style = {{opacity: opacity}} className = 'hoverLink' onClick={() => setClicked(!clicked)}>
             <p>{instructor}</p>
            {clicked && (
                <div>
                    <p><b>Rank: </b>{(rank + 1) + "/" + N}</p>
                    <p><b>Rating: </b>{rating}</p>
                    {/* <p><b>Current classes: </b>{current_classes.length}</p> */}
                </div>
            )}
        </a>
    )
}

export default Instructor