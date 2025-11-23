import React, { useState } from 'react'

function getColorForRank(darkMode, rank, total) {
    const percentile = rank / total;

    if (percentile <= 0.25) {
        return darkMode ? '#59d45f' : "green";
    } else if (percentile <= 0.50) {
        return darkMode ? '#e2e388' : '#a8ad00';
    } else if (percentile <= 0.75) {
        return 'orange';
    } else {
        return darkMode ? '#db4242' : "red";
    }
}


const Instructor = ( {darkMode, N, index, rank, rank_percentile, sentiment_percentile, instructor, current_classes, rating, OPACITYLIMIT} ) => {

    const [clicked, setClicked] = useState(false);
    const opacity = (index > OPACITYLIMIT ) ? 2 - (index / OPACITYLIMIT) ** 2 : 1;

    const color = getColorForRank(darkMode, rank, N);

    return (
        <a style = {{opacity: opacity, MozOpacity: opacity, WebkitOpacity: opacity, color: color}} className = {darkMode ? 'hoverLink2' : 'hoverLink'} onClick={() => setClicked(!clicked)}>
            <div>
             <p><b style = {{fontWeight: "500"}}>{instructor}</b></p>
            {clicked && (
                <div>
                    <h5><b>Rank: </b>{rank + "/" + N}</h5>
                    <h5><b>Rating Percentile: </b>{rank_percentile.toFixed() + "%"}</h5>
                    <h5><b>Sentiment Percentile: </b>{sentiment_percentile.toFixed() + "%"}</h5>
                    <h5><b>Currently Teaching: </b>{current_classes.join(", ")}</h5>
                </div>
            )}
            </div>
        </a>
    )
}

export default Instructor