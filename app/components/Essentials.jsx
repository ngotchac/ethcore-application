import React from 'react';

export default class App extends React.Component {
    render() {
        var Essentials = this.props.value;

        return (
            <div>
                <p>
                    <b>Locations</b>: 
                    &nbsp;
                    {
                        Essentials
                            .locations
                            .map(l => capitalize(l))
                            .join(', ')
                    }
                </p>
                <p>
                    <b>Employment</b>: 
                    &nbsp;{capitalize(Essentials.employment)}
                </p>
                <p>
                    <b>Start</b>: 
                    &nbsp;{printDate(Essentials.startdate)}
                </p>
            </div>
        );
    }
}

function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
}

function printDate(datetime) {
    return (new Date(datetime))
        .toUTCString()
        .slice(0, 16);
}
