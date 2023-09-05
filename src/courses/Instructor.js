import React, { useState } from 'react'

const Instructor = ( {N, rank, instructor, current_classes, rating, OPACITYLIMIT} ) => {

    const [clicked, setClicked] = useState(false);
    const opacity = (rank > OPACITYLIMIT ) ? 2 - (rank / OPACITYLIMIT) ** 2 : 1;

    return (
        <a style = {{opacity: opacity}} className = 'hoverLink' onClick={() => setClicked(!clicked)}>
            <div>
             <p><b>{instructor}</b></p>
            {clicked && (
                <div>
                    <h5><b>Rank: </b>{(rank + 1) + "/" + N}</h5>
                    <h5><b>Rating: </b>{rating}</h5>
                    {/* <p><b>Current classes: </b>{current_classes.length}</p> */}
                </div>
            )}
            </div>
        </a>
    )
}

export default Instructor