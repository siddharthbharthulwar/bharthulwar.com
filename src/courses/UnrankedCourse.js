import React, { useState } from 'react'
import 'charts.css'

function toReadableString(names) {
    if (names.length === 1) { 
      return names[0]; 
    }

    const formattedNames = names.slice(0, -1).join(', ')
    return `${formattedNames} and ${names[names.length - 1]}`
  }

const UnrankedCourse = ( {darkMode, index, name, instructors, course_name, OPACITYLIMIT} ) => {

    const [clicked, setClicked] = useState(false);
    const opacity = (index > OPACITYLIMIT ) ? 2 - (index / OPACITYLIMIT) ** 2 : 1;
    const color = darkMode ? "white" : "black";

    const safariVersion = (<div>
        <h5><b>Instructor: </b>{toReadableString(instructors)}</h5>
        <h5>No prior Q-Guide data for this course.</h5>
    </div>)

    return (
        <a style = {{opacity: opacity, MozOpacity: opacity, WebkitOpacity: opacity, color: color}} className='hoverLink2' onClick={() => setClicked(!clicked)}>
            <div>
                <p><b style = {{fontWeight: "500"}}>{name + " - " + course_name}</b></p>

                {clicked && (
                    safariVersion
                )}
            </div>
        </a>
    )
}

export default UnrankedCourse