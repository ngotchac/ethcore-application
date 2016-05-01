/**
 * This is the main component, the Sentence component.
 *
 * It will render a sentence trying to be as accurate as possible
 * in order for it to be readable and understandable.
 */
import React from 'react';

import styles from './Sentence.less';

export default class Sentence extends React.Component {
    render() {
        var values = this.props.values;

        // Construct the sentence out of each given parts.
        var jsxSentence = Object
                .keys(values)
                .map((key, i) => {
                    // End with a bullet, a comma or a "and" depending if
                    // it is the first, second or the other parts of the
                    // sentence (the array is then reversed)
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

/**
 * Return the conjugation of the verb to be dependending
 * of the value type or the key (plural/singular).
 *
 * @param  {String} key
 * @param  {Object} value
 * @return {String}
 */
function toBe(key, value) {
    if (value instanceof Array) return 'could be';

    // Very simple and poor detection of plural.
    if (key.slice(-1) === 's') return 'are';
    return 'is';
}

/**
 * This is the main function of the component, that will
 * print the correct sentence depending of the value and the key.
 * It tries to be as accurate as possible, but a lot of work
 * can be done here to improve it.
 *
 * @param  {String} key
 * @param  {Object} value
 * @return {String}
 */
function valueToString(key, value) {
    var be = toBe(key, value);
    
    var beginning = (<span key="beg">the {key} {be} </span>),
        end;

    // These are the special cases, that need to be checked "manually"
    if (key.toLowerCase() === 'salary') {
        end = salaryToString(value);

    } else if (key.toLowerCase() === 'corehours') {
        end = hoursToString(value);

    } else if (key.toLowerCase() === 'workweek') {
        end = secToH(value);

    // These are the more automatically detected cases
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
    
    // If it is a boolean, the sentence is kind of revesed.
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

/**
 * Print a number with the comma separation
 */
function printNumber(number) {
    // Split decimal and integer parts
    var str = number.toString().split('.');

    // Add commas to integer part
    var ent = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if (str.length > 1) ent += '.' + str[1];

    return ent;
}

/**
 * Print a time in seconds in a readable way
 * (eg. 10h30m40s)
 */
function secToH(value) {
    var h = Math.floor(value / 3600),
        m = Math.floor((value % 3600) / 60),
        s = value % 60;

    var hStr = h ? h+'h' : '',
        mStr = m ? m+'m' : '',
        sStr = s ? s+'s' : '';

    return [hStr, mStr, sStr].join(' ');
}

/**
 * Print the money with the currency symbol.
 * This a simplified version of course.
 */
function moneyToString(amount, currency) {
    let cur = currency.toUpperCase();
    if (cur === 'USD') return '$' + amount;
    if (cur === 'GBP') return '£' + amount;
    if (cur === 'EUR') return amount + '€';
    return `(${currency}) ${amount}`;
}

/**
 * Print the salary value (very specific)
 */
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

/**
 * Print the hours Object
 */
function hoursToString(hours) {
    var fromH = hours.from.toString().slice(0, 2),
        fromM = hours.from.toString().slice(2),
        toH = hours.to.toString().slice(0, 2),
        toM = hours.to.toString().slice(2);

    return `from ${fromH}h${fromM} to ${toH}h${toM}`;
}

/**
 * Print a date.
 */
function printDate(datetime) {
    return 'on ' + (new Date(datetime))
        .toUTCString()
        .slice(0, 16);
}
