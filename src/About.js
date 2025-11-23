import React from 'react'
import Time from './Time';
import HoverLink from './HoverLink';
import './index.css';
import { isChrome } from 'react-device-detect';

const About = () => {


    return (
        <div style = {{maxWidth: "75%"}}>
            {isChrome ? (
            <div class = "nameBoxDivChrome">
                Sid Bharthulwar
            </div>
            ) : (
                <div class = "nameBoxDiv">
                </div>
            )}

          <Time></Time>

            <p>I'm currently a quantitative researcher at <HoverLink text = "Jump Trading" href = "http://jumptrading.com"></HoverLink> working on AI.</p>
            
            <p>I studied math and computer science at Harvard, where I conducted research on reinforcement learning and diffusion models. My research was presented at NeurIPS, ICML, ICLR, and RLC.</p>
            
            <p>I've also interned at <HoverLink text = "Two Sigma" href = "http://twosigma.com"></HoverLink> and <HoverLink text = "Bridgewater Associates" href = "http://bridgewater.com"></HoverLink>.</p>
            
            <p>
            Feel free to <HoverLink routing = "/contact" text = "reach out"/> - my DMs are open. </p>
            
            <img src="https://hitwebcounter.com/counter/counter.php?page=7811144&style=0007&nbdigits=5&type=ip&initCount=0" id = "counter" border="0" />

        </div>
    )
}

export default About
