import React from 'react'
import Footer from '../Footer'
import HoverLink from '../HoverLink'
import Selector from './Selector'
import { useState } from 'react'
import Term from './Term'
import currentData from './webapp.json'
import instructorsData from './instructor_rankings.json'
import '../index.css'
import Instructors from './Instructors'

const Classes = () => {

  const [q, setQ] = useState("");
  const [conflicts, setConflicts] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const names = new Set(currentData.map(i => i.name));
  const hashmap = currentData.reduce((obj, item) => {
    obj[item.name] = item;
    return obj;
  }, {});

  console.log(hashmap);

  return (
    <div style = {{marginTop: "-25%"}}>
      <h2>Course Selection at Harvard</h2>
      {/* <p><b>What are the best classes at Harvard?</b> In my experience, course selection is largely a data discovery problem, and with over 1500 classes being offered in the 2023-2024 academic year, this task is far from trivial.</p> 

      <h3>Rankings</h3> */}

    <div>
        <div className = "selectorBox">
          <Selector index = {0} currentPage = {currentPage} text = "Fall 2023 Classes" onClick={setCurrentPage} />
          <div style = {{width: "5px"}}></div>
          <Selector index = {1} currentPage = {currentPage} text = "Spring 2024 Classes" onClick={setCurrentPage} />
          <div style = {{width: "5px"}}></div>
          <Selector index = {2} currentPage = {currentPage} text = "2023/2024 Instructors" onClick = {setCurrentPage} />
        </div>

        <div style={{ marginTop: '5px' }}></div> {/* Vertical space */}
        <input
          type = "search"
          style = {{
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "none",
            outline: "none",
            border: "none",
            borderBottom: "1px solid black",
            fontSize: "small",
            width: "100%",
            marginBottom: "10px",
            fontFamily: "inherit",
            backgroundColor: "inherit",
          }}
          placeholder = {(currentPage == 2) ? "Search for instructors..." : "Search for classes..."}
          id = "search-form"
          value = {q}
          onChange = {(e) => setQ(e.target.value)}
          autoFocus
        />

        

        {!(currentPage == 2) && 
        <div>
          <p>Filter out conflicts with classes you're already taking: MATH 122, COMPSCI 229r,...</p>
          <input
            type = "search"
            style = {{
              appearance: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
              outline: "none",
              border: "none",
              borderBottom: "1px solid black",
              fontSize: "small",
              width: "100%",
              marginBottom: "10px",
              fontFamily: "inherit",
              backgroundColor: "inherit",
            }}
            placeholder = "Enter comma-separated catalog numbers"
            id = "search-form"
            value = {conflicts}
            onChange = {(e) => setConflicts(e.target.value)}
            autoFocus
          /> 
        </div>
        }

        {currentPage == 0 && <Term term = "2022 Fall" data = {currentData} query = {q} conflictsQuery = {conflicts} names = {names} hashmap = {hashmap}/>}
        {currentPage == 1 && <Term term = "2023 Spring" data = {currentData} query = {q} conflictsQuery = {conflicts} names = {names} hashmap = {hashmap}/>}
        {currentPage == 2 && <Instructors data = {instructorsData} />}
      </div>

      <h3>Methodology</h3>
      
      <p style={{textAlign: "left"}}>
      I scraped Harvard's entire <HoverLink text = "Q Guide" href = "https://q.fas.harvard.edu/" /> and assigned each course/instructor a rating based on 1) the overall class rating 2) the overall instructor rating and 3) the comments. In my experience, these features provide the strongest signal as to the quality of a class. Raw text reviews are mapped to sentiment scores with a transformer finetuned on Amazon reviews. Sentiment signals and review signals are equally weighted, and tradeoffs between raw scores and the number of observations are resolved with a Bayesian technique (4.8 with 50 observations is a better signal than 5.0 with 1 observation). </p>
      <Footer />
    </div>
  )
}

export default Classes