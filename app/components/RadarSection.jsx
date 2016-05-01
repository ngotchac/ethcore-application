/**
 * This Compononent is the RadarSection, used for
 * displaying the data with some radar charts,
 * if the data values are `level` values (@see advert.js)
 */
import React from 'react';
var RadarChart = require("react-chartjs").Radar;

import Advert from '../advert';
import {capitalize} from '../utils';

import styles1 from './Section.less';
import styles2 from './RadarSection.less';

export default class RadarSection extends React.Component {
    render() {
        var values = this.props.value,
            name = this.props.name;

        // Generate the main radar chart, from the given values Object
        var generalRadar = generateRadar(values);

        // Generate all the other radar charts from the keys which
        // has Objects as values.
        // These are the previously `oneof` keys.
        var oneOfs = Object
                .keys(values)
                .filter(k => values[k] instanceof Object)
                .map(function(k, i) {
                    // Generate the radar chart
                    var radar = generateRadar(values[k]);

                    // End the last introduction sentence with 'And'
                    var intro = 'One';
                    if (i === 0) intro = 'And one';

                    // Return the chart and the introduction sentence
                    return (<div key={i}>
                        <p>{intro} of these {k}:</p>
                        {radar}
                    </div>); 
                }).reverse();

        return (
            <div className={[styles1.className, styles2.className].join(' ')}>
                <h3>{capitalize(name)}</h3>
                <p>We expect the following general skills:</p>
                {generalRadar}
                {oneOfs}
            </div>
        );
    }
}

/**
 * Generate a radar chart, from the Chart.js library.
 *
 * @param  {Object} values  The values Object which values are a level.
 * @return {JSX}            The JSX representation of the chart
 */ 
function generateRadar(values) {
    // Get all the levels
    var levels = Advert.level.all;

    // Filter the keys which values are levels.
    var radarKeys = Object
            .keys(values)
            .filter(k => levels.indexOf(values[k].toString()) >= 0);

    // Shuffle the keys for non-uniformity
    shuffle(radarKeys);

    // Capitalize the labels
    var labels = radarKeys.map(k => capitalize(k));
    // The score is just the index of the value in the levels array
    // (we suppose that it is ordered by increasing level)
    var data = radarKeys.map(k => {
        return levels.indexOf(values[k]) + 1;
    });

    var chartOptions = {
        responsive: true,
        pointLabelFontSize: 17,
        pointLabelFontFamily: 'Roboto',
        pointLabelFontColor: 'rgba(255, 255, 255, 0.7)',
        tooltipTemplate: function(v) {
            return v.label+': '+levels[v.value-1];
        }
    };

    var chartData = {
                labels: labels,
                datasets: [{
                    data: data
                }]
            };

    return (<RadarChart data={chartData} options={chartOptions} />);
}

/**
 * Shuffles array in place.
 */
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
