import React from 'react';

import './Section.less';

export default class Section extends React.Component {
    render() {
        var values = this.props.value,
            name = capitalize(this.props.name);

        var jsxValues = Object
                .keys(values)
                .map(key => {
                    return (
                        <p key={key}>
                            <b>{capitalize(key)}</b><br />
                            {valueToString(values[key])}
                        </p>
                    );
                });


        return (
            <div>
                <h3>{name}</h3>

                {jsxValues}
            </div>
        );
    }
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

function valueToString(value) {
    if (typeof value === 'string') {
        return capitalize(value);
    }
    if (value instanceof Array) {
        return value.map(s => capitalize(s)).join(', ');
    }
    if (value instanceof Object) {
        if (value.min && value.max) {
            return `From ${value.min} to ${value.max}`;
        }

        return Object.keys(value)
            .map(k => {
                return (
                    <p>{capitalize(k)}: {valueToString(value[k])}</p>
                );
            });
    }
    if(typeof value === 'number') {
        var minDate = (new Date(2000, 0, 1)).getTime();
        var maxDate = (new Date(2020, 11, 31)).getTime();

        // Test the number trying to recognize a timestamp
        if (value > minDate && value < maxDate)
            return printDate(value);

        return value;
    }
    if (typeof value === 'boolean') {
        if (value) return 'True';
        return 'False';
    }

    console.log(typeof value, value instanceof Object, value);

}

function printDate(datetime) {
    return (new Date(datetime))
        .toUTCString()
        .slice(0, 16);
}
