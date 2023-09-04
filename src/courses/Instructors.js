import React from 'react'
import Instructor from './Instructor';

const Instructors = ( {data} ) => {

  const PAGELIMIT = 40;
  const OPACITYLIMIT = 30;

  return (
    <div style = {{textAlign: "left"}}>
      {data.slice(0, PAGELIMIT)
      .map((item, index) => {
        return (
          <div key = {index}>
            <Instructor OPACITYLIMIT = {OPACITYLIMIT} N = {data.length} rank = {item.rank} instructor = {item.instructor} rating = {item.rating} />
          </div>
        )
      })}
    </div>
  )
}

export default Instructors