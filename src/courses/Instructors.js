import React from 'react'
import Instructor from './Instructor';

const Instructors = ( {darkMode, data, query, reverse} ) => {

  const PAGELIMIT = 40;
  const OPACITYLIMIT = 30;

  return (
    <div style = {{textAlign: "left"}}>
      {(reverse ? [...data].reverse() : data)
      .filter((item) => {
        const searchName = item.instructor + item.classes.join(",");
        if (query == "") {
          return item;
        } else if (searchName.toLowerCase().includes(query.toLowerCase())){
          return item;
        }
      })
      .slice(0, PAGELIMIT)
      .map((item, index) => {
        return (
          <div key = {index}>
            <Instructor darkMode = {darkMode} index = {index} rank_percentile = {item.rank_percentile} sentiment_percentile = {item.sentiment_percentile} OPACITYLIMIT = {OPACITYLIMIT} N = {data.length} rank = {item.rank} instructor = {item.instructor} rating = {item.rating} current_classes = {item.classes}/>
          </div>
        )
      })}
    </div>
  )
}

export default Instructors