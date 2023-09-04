import React from 'react'
import Course from './Course';

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

const Term = ( {term, data, query, conflictsQuery, names, hashmap } ) => {
    const PAGELIMIT = 40;
    const CHARLIMIT = 80;
    const OPACITYLIMIT = 91;

    const conflictsList = conflictsQuery.split(',').map(item => item.trim())

    const conflicts = conflictsList.filter(i => names.has(i))
    return (
        <div style = {{textAlign: "left"}}>
            {data.filter((item) => {
                const searchName = item.name + item.course_name + item.instructors;
                if (query == "") {
                    return item
                } else if (searchName.toLowerCase().includes(query.toLowerCase())) {
                    return item
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
                return (
                    <div key = {index}> 
                        <Course N = {data.length} name = {item.name} rank_percentile = {item.rank_percentile} sentiment_percentile = {item.sentiment_percentile} rank = {item.rank} course_name = {item.course_name} OPACITYLIMIT = {OPACITYLIMIT} />
                    </div>
                )
            })
            }
        </div>
    )
}

export default Term