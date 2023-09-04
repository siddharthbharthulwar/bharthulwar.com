import React from 'react'
import Time from './Time';
import HoverLink from './HoverLink';
import './index.css';

const About = () => {

    return (
        <div>

            <div class = "nameBoxDiv" >
          </div>
          <Time></Time>


            {/* <p>I study math and computer science at Harvard. In the past, I worked at <HoverLink text = "Bridgewater Associates" href = "http://bridgewater.com"></HoverLink> and <HoverLink text = "Two Sigma" href = "http://twosigma.com" />, and conducted research at <HoverLink text = "MIT CSAIL" href = "http://nms.csail/mit/edu/" /> and <HoverLink text = "Harvard Medical School" href = "https://cavalab.org/" />. </p>
                
            <p>In high school, I published <HoverLink text = "award-winning" href = "https://www.societyforscience.org/regeneron-sts/2021-scholars/"></HoverLink> <HoverLink text = "machine learning research" href = "https://www.medrxiv.org/content/10.1101/2022.05.17.22275229v1.full-text"></HoverLink> and was an early engineer at an <HoverLink text = "AI startup" href = "https://www.unsupervised.com" />. 
            
             */}

            <p>I study computer science and math at Harvard. In the past, I've worked on macroeconomics research at <HoverLink text = "Bridgewater" href = "http://bridgewater.com"></HoverLink>, software engineering at <HoverLink text = "Two Sigma" href = "http://twosigma.com"></HoverLink> and an <HoverLink text = "early-stage AI startup" href = "http://unsupervised.com"></HoverLink>, and research at Harvard, MIT CSAIL, and Penn. 
            
            Feel free to <HoverLink routing = "/contact" text = "reach out"/> - my DMs are always open. And if you're a Harvard undergrad, check out my <HoverLink text = "statistical approach to course selection" routing = "/classes" />. </p>
            
            <img src="https://hitwebcounter.com/counter/counter.php?page=7811144&style=0007&nbdigits=5&type=ip&initCount=0" id = "counter" border="0" />

        </div>
    )
}

export default About
