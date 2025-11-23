import React from 'react'
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

function fullHistogram(data, window, height) {
  const startArr = data.map(item => item.rating);
  const histogram = kernelDensityEstimation(data.map(item => item.rating), 100, 5, 10);
  const tiles = []
  for (let i = (histogram.length / 2) ; i < histogram.length - 1; i++) {
    tiles.push({
      start: height * histogram[i],
      end: height * histogram[i + 1],
    })
  }  

  return tiles;
}

const RateMySemester = ( {data, query} ) => {

  const abbreviationMappings = {"cs" : "compsci", "am" : "apmth", "ec" : "econ", "ls" : "lifesci", "es" : "eng-sci"};

  const initialClassesList = query.split(',').map(item => item.trim()).map(item => item.toLowerCase());
  const classesList = initialClassesList.map((item) => {

    if (item.split(' ').length == 1) {
      let res = item.search(/\d/);
      if (res == -1){
        item = item
      } else {
        item = item.substring(0, res) + " " + item.substring(res)
      }
    }
    let temp = item.split(' ')[0]

    if (temp in abbreviationMappings){
      return abbreviationMappings[temp] + " " + item.split(' ')[1]
    } else {
      return item
    }
  })

  console.log(initialClassesList)
  console.log(classesList)

  const aggData = data.filter(item => classesList.includes(item.name.toLowerCase()))

  const worstClass = aggData.length > 0 ? aggData.reduce((max, item) => max.rank > item.rank ? max : item) : null;
  const bestClass = aggData.length > 0 ? aggData.reduce((min, item) => min.rank < item.rank ? min : item) : null;
  const avgPercentile = aggData.length > 0 ? aggData.reduce((sum, item) => sum + item.rank_percentile, 0) / aggData.length : 0;

  //baseline
  const baseline_tiles = fullHistogram(data, 3, 9);
  const tiles = fullHistogram(aggData, 3, 7);

  return (
    <div>
      <div>
      <h5>Score distribution of <b style = {{color: "#ffc76e"}}>your classes</b> and <b style = {{color: "#f66c68"}}>all classes</b> - higher is better</h5>
      <table class = "charts-css area multiple show-labels" style = {{marginBottom: "10px"}}>
        <tbody>

          {tiles.map((item, index) =>(
            <tr>
              <td style={{'--start': baseline_tiles[index].start, '--end' : baseline_tiles[index].end }}></td>
              <td style={{ '--start': item.start, '--end' : item.end }}>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <h5><b>Number of Classes: </b>{aggData.length}</h5>
      {aggData.length > 0 &&
        <div>
          <h5 style = {{color: "green"}}><b>Best Class: </b>{bestClass.course_name}</h5>
          <h5 style = {{color: "red"}}><b>Worst Class: </b>{worstClass.course_name}</h5>
          <h5><b>Average Percentile of Classes: </b>{avgPercentile.toFixed() + "%"}</h5>
        </div>
      }

    </div>
  )
}

export default RateMySemester