import React, { useState } from 'react'

const Selector = ( {index, currentPage, text, onClick} ) => {

    const [hover, setHover] = useState(false);
    
    const divCSS = (currentPage == index) ? {marginRight: "5px", fontSize: "small", backgroundColor: "#212121", color: "white", borderRadius: "1px", padding: "1px", margin: "1px"} : {fontSize: "small", backgroundColor: hover ? "red" : "inherit", color: hover ? "white" : "black", borderRadius: "1px", padding: "1px", margin: "1px", marginRight: "5px"};


    return (
      <div style = {divCSS}>
        <a
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick = {() => onClick(index)}>{text}</a>
      </div>
    )
}

export default Selector