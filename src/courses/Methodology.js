import React from 'react'
import HoverLink from '../HoverLink'

const Methodology = () => {
  return (
    <div>
        <h4>Why did you make this?</h4>
        <p style = {{textAlign: "left", marginTop: "-15px"}}>
        Course selection at Harvard is largely a discovery problem; I (and many others) have had the experience of finding out about a good class after add/drop. Course selection is unfortunately a problem too large to brute-force, with over 2000 classes being offered this year. I built this tool to narrow down this giant corpus of information to only a select few "good" classes.
        </p>

        <h4>How are rankings determined?</h4>
        <p style = {{textAlign: "left", marginTop: "-15px"}}>
        Three features from the Q-Guide weighted equally: students' ratings of the class (0 to 5), student's ratings of the instructor, and student-written comments about the class. The comments are mapped to scalar sentiment scores with a BERT transformer finetuned on Amazon reviews. Tradeoffs between raw mean rating/sentiment scores and the number of observations are resolved with a quick Bayesian technique (4.8 with 50 observations is a stronger signal than 5.0 with 1 observation). 
        </p>

        <h4>Why isn't a class I'm interested in displayed here?</h4>
        <p style = {{textAlign: "left", marginTop: "-15px"}}>
        A couple of reasons. 1) it's not being offered during this current academic year. 2) it is being offered this year, but there is no prior Q-Guide data on it. 3) something went wrong, and you can <HoverLink text = "let me know" routing = "/contact"/>.
        </p>

    </div>
  )
}

export default Methodology