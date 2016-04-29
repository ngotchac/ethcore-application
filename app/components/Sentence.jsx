import React from 'react';

import styles from './Sentence.less';

export default class Sentence extends React.Component {
    render() {
        var values = this.props.values;

        var jsxSentence = Object
                .keys(values)
                .map((key, i) => {
                    if (i === 0) var end = (<span>.</span>);
                    else if (i === 1) var end = (<span> and </span>);
                    else var end = (<span>, </span>);

                    return (
                        <span key={key}>
                            {valueToString(key, values[key])}
                            {end}
                        </span>
                    );
                }).reverse();

        return (
            <p className={styles.className}>
                {jsxSentence}
            </p>
        );
    }
}

function toBe(key, value) {
    if (value instanceof Array) return 'could be';

    // Very simple and poor detection of plural.
    if (key.slice(-1) === 's') return 'are';
    return 'is';
}

function valueToString(key, value) {
    var be = toBe(key, value);
    
    var beginning = (<span key="beg">the {key} {be} </span>),
        end;

    if (key.toLowerCase() === 'salary') {
        end = salaryToString(value);

    } else if (key.toLowerCase() === 'corehours') {
        end = hoursToString(value);

    } else if (key.toLowerCase() === 'workweek') {
        end = secToH(value);

    } else if (typeof value === 'string') {
        end = value;

    } else if (value instanceof Array) {
        var capValues = value;
        end = capValues.slice(0, -1).join(', ') + ' or ' + capValues[capValues.length-1];

    }  else if (typeof value === 'number') {
        var minDate = (new Date(2000, 0, 1)).getTime();
        var maxDate = (new Date(2020, 11, 31)).getTime();

        // Test the number trying to recognize a timestamp
        if (value > minDate && value < maxDate) {
            end = printDate(value);
        } else {
            end = value;
        }
        
    } else if (typeof value === 'boolean') {
        var part = [(<span key="beg">there </span>)];
        if (value) part.push((<span key="mid" className="value">{be}</span>));
        else part.push((<span key="mid" className="value">{be} no</span>));
        part.push((<span key="end"> {key}</span>));
        return part;
    } else if (value instanceof Object) {
        if (value.min && value.max) {
            end = `from ${value.min} to ${value.max}`;
        } else {
            end = Object.keys(value).map(k => [k, value[k]].join(': ')).join(', ');
        }

    }

    end = (<span key="end" className="value">{end}</span>);

    return [beginning, end];
}

function printNumber(number) {
    // Split decimal and integer parts
    var str = number.toString().split('.');

    // Add commas to integer part
    var ent = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if (str.length > 1) ent += '.' + str[1];

    return ent;
}

function secToH(value) {
    var h = Math.floor(value / 3600),
        m = Math.floor((value % 3600) / 60),
        s = value % 60;

    var hStr = h ? h+'h' : '',
        mStr = m ? m+'m' : '',
        sStr = s ? s+'s' : '';

    return [hStr, mStr, sStr].join(' ');
}

function moneyToString(amount, currency) {
    let cur = currency.toUpperCase();
    if (cur === 'USD') return '$' + amount;
    if (cur === 'GBP') return '£' + amount;
    if (cur === 'EUR') return amount + '€';
    return `(${currency}) ${amount}`;
}

function salaryToString(salary) {
    var amount = printNumber(parseFloat(salary.amount)),
        currency = salary.currency,
        interval = salary.interval.toLowerCase(),
        status = salary.status.toLowerCase(),
        stockOptions;

    if (salary.stockoptions) stockOptions = 'with';
    else stockOptions = 'without';
    stockOptions += ' stock-options';

    var money = moneyToString(amount, currency);

    return `${money} per ${interval} (${status}) ${stockOptions}`;
}

function hoursToString(hours) {
    var fromH = hours.from.toString().slice(0, 2),
        fromM = hours.from.toString().slice(2),
        toH = hours.to.toString().slice(0, 2),
        toM = hours.to.toString().slice(2);

    return `from ${fromH}h${fromM} to ${toH}h${toM}`;
}

function printDate(datetime) {
    return 'on ' + (new Date(datetime))
        .toUTCString()
        .slice(0, 16);
}
