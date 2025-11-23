import React from 'react'
import Course from './Course';
import UnrankedCourse from './UnrankedCourse';

function truncateWithEllipsis(str, charLimit) {
    if (str.length <= charLimit) return str;
    return str.substring(0, charLimit - 3) + "...";
  }


function convertTime(timeStr) {
// Convert "1:30pm - 2:45pm" to [13.5, 14.75]

    if (timeStr === "TBA" || timeStr.split(" - ").length !== 2) {
        return [0, 0];
    }

    let [start, end] = timeStr.split(" - ");
    let [startHour, startMin] = start.split(":");
    let [endHour, endMin] = end.split(":");

    startMin = startMin.substring(0, 2);
    endMin = endMin.substring(0, 2);

    startHour = Number(startHour)
    startMin = Number(startMin)

    endHour = Number(endHour)
    endMin = Number(endMin)

    if (start.includes("pm")) {
        startHour += 12;
    }
    if (end.includes("pm")) {
        endHour += 12;
    }

    let startTime = startHour + startMin / 60;
    let endTime = endHour + endMin / 60;
    return [startTime, endTime];
}

function isConflict(meeting_days1, meeting_days2, time1, time2) {

    let m1 = new Set(meeting_days1)
    let m2 = new Set(meeting_days2)

    let intersection = new Set([...m1].filter(x => m2.has(x)))

    if (intersection.size === 0) {
        return false;
    } else {
        let [s1, e1] = convertTime(time1);
        let [s2, e2] = convertTime(time2);

        return (s1 <= e2 && s2 <= e1) || (s2 <= s1 && e1 <= e2);
    }
}

function checkAbbreviations(name) {
    const abbreviationMappings = {"cs" : "compsci", "am" : "apmth", "ec" : "econ", "ls" : "lifesci", "es" : "eng-sci"};
    var res = ""
    for (let i = 0; i < name.length; i++) {
        let window = name.substring(i, i + 2);
        if (window in abbreviationMappings && i + 2 < name.length) {
            res += abbreviationMappings[window];
            i += 1;
        } else {
            res += name[i];
        }
    }
    return res
}

const Term = ( {numConflicts, setNumConflicts, darkMode, term, data, query, conflictsQuery, names, hashmap, seminarsOnly, reverse, departmentHistogram } ) => {
    const PAGELIMIT = 40;
    const OPACITYLIMIT = 30;
    const abbreviationMappings = {"cs" : "compsci", "am" : "apmth", "ec" : "econ", "ls" : "lifesci", "es" : "eng-sci"};
    const capitalizeAllLetters = str => str.toUpperCase();
    const initialConflictsList = conflictsQuery.split(',').map(item => item.trim()).map(item => item.toLowerCase());
    const N = data.filter((item) => {
        if (item.has_priors == "true"){
            return item;
        }
    }).length
    const conflictsList = initialConflictsList.map((item) => {
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
    }).filter(
        (item) => {
            if (names.has(capitalizeAllLetters(item))){
                if (hashmap[capitalizeAllLetters(item)]) {
                    if (hashmap[capitalizeAllLetters(item)].term == term){
                        return item
                    }
                }
            }
        }
    ).map((item) => capitalizeAllLetters(item))
    const countUniques = arr => 
    Array.from(new Set(arr)).length;
    const conflicts = conflictsList.filter(i => names.has(i))
    setNumConflicts(countUniques(conflicts));

return (
        <div style = {{textAlign: "left"}}>
            {(reverse ? [...data].reverse()
                .filter((item => {
                    if (item.has_priors == "true"){
                        return item
                    }
                }))
                .concat(data.filter((item => {
                    if (item.has_priors == "false"){
                        return item
                    }
                })))
            : data)
            .filter((item) => {
                if (seminarsOnly) {
                    if (item.course_component == "Seminar") {
                        const searchName = item.name + item.course_name + item.instructors + item.name.replace(/\s+/g, '');
                        if (query == "") {
                            return item
                        } else if (searchName.toLowerCase().includes(query.toLowerCase()) || searchName.toLowerCase().includes(checkAbbreviations(query.toLowerCase()))) {
                            return item
                        }
                    }
                } else {
                    const searchName = item.name + item.course_name + item.instructors + item.name.replace(/\s+/g, '');
                    if (query == "") {
                        return item
                    } else if (searchName.toLowerCase().includes(query.toLowerCase()) || searchName.toLowerCase().includes(checkAbbreviations(query.toLowerCase()))) {
                        return item
                    }
                }
            })
            .filter((item) => {
                let existsConflict = conflicts.some(conf => isConflict(item.meeting_days, hashmap[conf].meeting_days, item.times, hashmap[conf].times));
                if ((item.term == term) && !existsConflict){
                    return item
                }
            })
            .slice(0, PAGELIMIT)
            .map((item, index) => {

                if (item.has_priors == "true") {
                    return (
                        <div key = {index}> 
                            <Course hours = {item.hours} darkMode = {darkMode} department = {item.name.split(' ')[0]} distribution = {departmentHistogram[item.name.split(' ')[0]]} instructors = {item.instructors} index = {index} N = {N} name = {item.name} rank_percentile = {item.rank_percentile} sentiment_percentile = {item.sentiment_percentile} rank = {item.rank} course_name = {item.course_name} rating = {item.rating} OPACITYLIMIT = {OPACITYLIMIT} />
                        </div>
                    )
                } else{
                    return (
                        <div key = {index}>
                            <UnrankedCourse darkMode = {darkMode} index = {index} name = {item.name} instructors = {item.instructors} course_name = {item.course_name} OPACITYLIMIT = {OPACITYLIMIT}>

                            </UnrankedCourse>
                        </div>
                    )
                }


            })
            }
        </div>
    )
}

export default Term