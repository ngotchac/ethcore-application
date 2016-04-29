import React from 'react';
var RadarChart = require("react-chartjs").Radar;

import Advert from '../advert';

import styles1 from './Section.less';
import styles2 from './RadarSection.less';

export default class RadarSection extends React.Component {
    render() {
        var values = this.props.value,
            name = this.props.name;

        var generalRadar = generateRadar(values);

        var oneOfs = Object
                .keys(values)
                .filter(k => values[k] instanceof Object)
                .map(function(k, i) {
                    var radar = generateRadar(values[k]);
                    var intro = 'One';
                    if (i === 0) intro = 'And one';
                    return (<div>
                        <p>{intro} of these {k}:</p>
                        {radar}
                    </div>); 
                }).reverse();

        return (
            <div className={[styles1.className, styles2.className].join(' ')}>
                <h3>{name}</h3>
                <p>We expect the following general skills:</p>
                {generalRadar}
                {oneOfs}
            </div>
        );
    }
}

function generateRadar(values) {
    var levels = Advert.level.all;

    var radarKeys = Object
            .keys(values)
            .filter(k => levels.indexOf(values[k].toString()) >= 0);

    var labels = radarKeys.map(k => capitalize(k));
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

function capitalizeWord(string) {
    return string[0].toUpperCase() + string.slice(1);
}

function capitalize(string) {
    return string
        .split(' ')
        .map(s => capitalizeWord(s))
        .join(' ');
}
