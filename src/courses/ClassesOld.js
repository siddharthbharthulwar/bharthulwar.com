import React from 'react'
import Footer from '../Footer'
import HoverLink from '../HoverLink'
import Selector from './Selector'
import { useState } from 'react'
import Term from './Term'
import currentData from './webapp2.json'
import instructorsData from './instructor_rankings.json'
import '../index.css'
import Instructors from './Instructors'
import RateMySemester from './RateMySemester'
import Methodology from './Methodology'
import { isMobile } from 'react-device-detect'

function gaussianKernel(x) {
  return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
}




const Classes = ( {darkMode} ) => {

  const [q, setQ] = useState("");
  const [q2, setQ2] = useState(""); 
  const [conflicts, setConflicts] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [seminarsOnly, setSeminarsOnly] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [numConflicts, setNumConflicts] = useState(0);

  const realData = currentData.filter((item) => {
    if (item.has_priors == "true") {
      return item;
    }
  })

  const names = new Set(currentData.map(i => i.name));
  const hashmap = currentData.reduce((obj, item) => {
    obj[item.name] = item;
    return obj;
  }, {});

  const departmentalHashmap = {}
  for (let i = 0; i < currentData.length; i++) {
    let item = currentData[i].name
    let dept = item.split(' ')[0]
    if (!(dept in departmentalHashmap)){
      departmentalHashmap[dept] = [currentData[i].rating]
    } else {
      departmentalHashmap[dept].push(currentData[i].rating)
    }
  }

  return (
    <div style = {{marginTop: isMobile ? "-5%" : "-20%"}}>
      <h3>Course Selection at Harvard</h3>

    <div>
        <div className = "selectorBox">
          <Selector darkMode = {darkMode} index = {0} currentPage = {currentPage} text = "Fall 2024" onClick={setCurrentPage} />
          <div style = {{width: "5px"}}></div>
          <Selector darkMode = {darkMode} index = {1} currentPage = {currentPage} text = "Spring 2025" onClick={setCurrentPage} />
          <div style = {{width: "5px"}}></div>
          <Selector darkMode = {darkMode} index = {2} currentPage = {currentPage} text = "Instructors" onClick = {setCurrentPage} />
          <div style = {{width: "5px"}}></div>
          <Selector darkMode = {darkMode} index = {3} currentPage = {currentPage} text = "Rate My Courseload" onClick = {setCurrentPage} />
          <Selector darkMode = {darkMode} index = {4} currentPage = {currentPage} text = "FAQ" onClick = {setCurrentPage} />
        </div>

        <div style={{ marginTop: '5px' }}></div> {/* Vertical space */}
        
        {(currentPage != 3 && currentPage != 4) && 
          <input
          type = "search"
          style = {{
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "none",
            outline: "none",
            border: "none",
            color: darkMode ? "white" : "black",
            caretColor: darkMode ? "white" : "black",
            borderBottom: darkMode ? "1px solid grey" : "1px solid black",
            fontSize: "small",
            width: "100%",
            marginBottom: "10px",
            fontFamily: "inherit",
            backgroundColor: "inherit",
          }}
          placeholder = {(currentPage == 2) ? "Search by instructor or dept name..." : 
          (currentPage == 3) ? "Enter classes comma-separated..." : "Search for classes..."}
          id = "search-form"
          value = {q}
          onChange = {(e) => setQ(e.target.value)}
          autoFocus
        />
        }

        {currentPage == 3 && 
          <textarea
            style = {{
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "none",
            outline: "none",
            border: "none",
            borderBottom: darkMode ? "1px solid grey" : "1px solid black",
            caretColor: darkMode ? "white" : "black",
            color: darkMode ? "white" : "black",
            fontSize: "small",
            width: "100%",
            marginBottom: "10px",
            fontFamily: "inherit",
            backgroundColor: "inherit",
          }}
          rows="3"
          placeholder = "Enter classes comma-separated..."
          id = "search-form"
          value = {q2}
          onChange = {(e) => setQ2(e.target.value)}
          autoFocus />}


        {currentPage == 2 && 
        <div>
          
          <input
            style = {{borderBottom: "2px solid white", marginLeft: "-1px", marginRight: "5px"}}
            type = "checkbox"
            checked = {reverse}
            onChange = {() => setReverse(!reverse)}/>
          <label style = {{fontSize: "small", marginRight: "10px"}}>Ascending Order</label>
        </div>}

        {!((currentPage == 2) || (currentPage == 3 || currentPage == 4)) && 
        <div>
          <p>Filter out conflicts with classes you're already taking, like: MATH 122, STAT 171,...</p>
          <input
            type = "search"
            style = {{
              appearance: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
              outline: "none",
              border: "none",
              borderBottom: darkMode ? "1px solid grey" : "1px solid black",
              caretColor: darkMode ? "white" : "black",
              color: darkMode ? "white" : "black",
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
          /> 
          <label style = {{fontSize: "small", marginRight: "10px"}}>Filtering out {numConflicts} conflicting classes</label>
          <input
            style = {{marginLeft: "-1px", marginRight: "5px"}}
            type = "checkbox"
            checked = {seminarsOnly}
            onChange = {() => setSeminarsOnly(!seminarsOnly)}/>
          <label style = {{fontSize: "small", marginRight: "10px"}}>Seminars Only</label>
          <input
            style = {{marginRight: "5px"}}
            type = "checkbox"
            checked = {reverse}
            onChange = {() => setReverse(!reverse)}/>
          <label style = {{fontSize: "small", marginRight: "10px"}}>Ascending Order</label>
          <h5>Classes are either in the <b style = {{color: darkMode ? '#59d45f' : "green"}}>first</b>, <b style = {{color: darkMode ? '#e2e388' : '#a8ad00'}}>second</b>, <b style = {{color: "orange"}}>third</b>, and <b style = {{color:darkMode ? '#db4242' : "red" }}>fourth</b> quartiles, or <b style = {{color: darkMode ? "white" : "black"}}>unranked</b>.</h5>
        </div>
        }

        {currentPage == 0 && <Term numConflicts = {numConflicts} setNumConflicts = {setNumConflicts} darkMode = {darkMode} departmentHistogram = {departmentalHashmap} term = "Fall 2024" reverse = {reverse} seminarsOnly = {seminarsOnly} data = {currentData} query = {q} conflictsQuery = {conflicts} names = {names} hashmap = {hashmap}/>}
        {currentPage == 1 && <Term numConflicts = {numConflicts} setNumConflicts = {setNumConflicts} darkMode = {darkMode} departmentHistogram= {departmentalHashmap} term = "Spring 2025" reverse = {reverse} seminarsOnly = {seminarsOnly} data = {currentData} query = {q} conflictsQuery = {conflicts} names = {names} hashmap = {hashmap}/>}
        {currentPage == 2 && <Instructors darkMode = {darkMode} reverse = {reverse} query = {q} data = {instructorsData} />}
        {currentPage == 3 && <RateMySemester data = {realData} query = {q2}/>}
        {currentPage == 4 && <Methodology />}
      </div>
      <Footer />
    </div>
  )
}

export default Classes