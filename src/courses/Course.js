import React, { useState } from 'react'
import 'charts.css'

function gaussianKernel(x) {
    return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
  }
  
  function kernelDensityEstimation(data, numBins) {
    // Define the range of the data (for ratings, this is fixed from 0 to 10)
    const minValue = 0;
    const maxValue = 10;
    
    // Calculate the bin width and setup the bins
    const range = maxValue - minValue;
    const binWidth = range / numBins;
    const bins = Array.from({ length: numBins }, (_, i) => minValue + i * binWidth + binWidth / 2);
  
    // Estimate the bandwidth (h)
    // Using Silverman's rule of thumb assuming data is close to normal distribution
    const n = data.length;
    const standardDeviation = 0.5 * Math.sqrt(data.reduce((acc, val) => acc + Math.pow(val - (minValue + range / 2), 2), 0) / n);
    const bandwidth = .25 * standardDeviation * Math.pow(n, -1 / 5);
  
    // Ensure bandwidth is not zero
    if (bandwidth === 0) throw new Error('Bandwidth calculation resulted in zero, which will cause division errors.');
  
    // Calculate the kernel density estimation for each bin center
    const histogram = bins.map(binCenter => {
      return data.reduce((acc, rating) => {
        const kernelValue = gaussianKernel((rating - binCenter) / bandwidth);
        return acc + kernelValue / (n * bandwidth);
      }, 0) * binWidth; // Scale the KDE by the bin width to get histogram-like values
    });
  
    return histogram;
  }

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

function toReadableString(names) {
    if (names.length === 1) { 
      return names[0]; 
    }
  
    const formattedNames = names.slice(0, -1).join(', ')
    return `${formattedNames} and ${names[names.length - 1]}`
  }

function fullHistogram(data, window, height) {
    const histogram = kernelDensityEstimation(data, 100, 5, 10);
    const tiles = []
    for (let i = (histogram.length / 2) ; i < histogram.length - 1; i++) {
        tiles.push({
            start: height * histogram[i],
            end: height * histogram[i + 1],
        })
        
    }
    return tiles;
}

const Course = ( {darkMode, N, index, name, hours, rank_percentile, sentiment_percentile, rank, rating, instructors, course_name, OPACITYLIMIT, distribution, department} ) => {

    const [clicked, setClicked] = useState(false);
    const opacity = (index > OPACITYLIMIT ) ? 2 - (index / OPACITYLIMIT) ** 2 : 1;
    const color = getColorForRank(darkMode, rank, N);
    const tiles = fullHistogram(distribution, 3, 4);
    const indexWithin = Math.floor(((rank_percentile + sentiment_percentile) / 200) * tiles.length);

    const safariVersion = (<div>
        <h5><b>Rank: </b>{rank + "/" + N}</h5>
        <h5><b>Rating Percentile: </b>{rank_percentile.toFixed() + "%"}</h5>
        <h5><b>Sentiment Percentile: </b>{sentiment_percentile.toFixed() + "%"}</h5>
        <h5><b>Instructor: </b>{toReadableString(instructors)}</h5>
        <h5><b>Hours: </b> Mean: {hours.mean}, Median: {hours.median}, Standard Deviation: {hours.std} (n = {hours.response_count || 0})</h5>
    </div>)

    const otherVersion = (
        <div style = {{position: "relative"}}>
            <div style = {{position: "absolute", zIndex: 2}}>
            <h5><b>Rank: </b>{rank + "/" + N}</h5>
            <h5><b>Rating Percentile: </b>{rank_percentile.toFixed() + "%"}</h5>
            <h5><b>Sentiment Percentile: </b>{sentiment_percentile.toFixed() + "%"}</h5>
            <h5><b>Instructor: </b>{toReadableString(instructors)}</h5>
            </div>
            <div id = "class-chart">
            <table class = "charts-css area multiple" style = {{marginBottom: "0px"}}>
            <tbody>
                {tiles.map((item, index) =>(
                    <tr>
                    {index == indexWithin && <td style={{ '--start': item.start, '--end' : item.end, '--color' : color, opacity: "55%" }}></td>}
                    <td style={{ '--start': item.start, '--end' : item.end, opacity: "15%", '--color' : "grey"}}></td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
            <h5 style = {{opacity: "50%", fontSize: "8px", color: "black", textAlign: "right"}}> Distribution of all {department} classes, {name} highlighted ({rank_percentile.toFixed() + "th percentile"})</h5>
        </div>
    )

    return (
        darkMode ? 
        <a style = {{opacity: opacity, MozOpacity: opacity, WebkitOpacity: opacity, color: color}} className='hoverLink2' onClick={() => setClicked(!clicked)}>
            <div>
                <p><b style = {{fontWeight: "500"}}>{name + " - " + course_name}</b></p>

                {clicked && (
                    safariVersion
                )}
            </div>
        </a>
        : 
        <a style = {{opacity: opacity, MozOpacity: opacity, WebkitOpacity: opacity, color: color}} className='hoverLink' onClick={() => setClicked(!clicked)}>
        <div>
            <p><b style = {{fontWeight: "500"}}>{name + " - " + course_name}</b></p>

            {clicked && (
                safariVersion
            )}
        </div>
    </a>
    )
}

export default Course