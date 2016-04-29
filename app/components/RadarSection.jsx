import React from 'react';
import Radar as RadarChart from 'react-chartjs';

export default class RadarSection extends React.Component {
    render() {
        var values = this.props.value,
            name = this.props.name;

        return (
            <div>
                <h3>{name}</h3>
                <RadarChart data={chartData} options={chartOptions} />
            </div>
        );
    }
}
