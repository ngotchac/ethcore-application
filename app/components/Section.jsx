/**
 * This is the Section component.
 * It is used for every section, expect the Technologies which
 * uses the RadarSection component.
 *
 * It will render the section as short sentences of maximum 3
 * parts, in order to keep them short and readable.
 */
import React from 'react';

import Sentence from './Sentence';
import {capitalize} from '../utils';

import styles from './Section.less';

export default class Section extends React.Component {
    render() {
        var values = this.props.value,
            content;

        if (this.props.name) {
            var name = <h3>{capitalize(this.props.name)}</h3>;
        }

        // Rendering an array (eg. Others) is just a bullet point list.
        if (values instanceof Array) content = renderArray(values);
        else content = renderObject(values);

        return (
            <div className={styles.className}>
                {name}
                <div className="content">
                    {content}
                </div>
            </div>
        );
    }
}

/**
 * This will render the short sentences from the section Object.
 */
function renderObject(values) {
    var keys = Object.keys(values),
        sentences = [],
        wordsPerSentence = 3;

    // Get the number of sentences
    var NSentences = Math.ceil(keys.length / wordsPerSentence);

    for (let i = 0; i < NSentences; i++) {
        // Get the keys for the sentence
        let sKeys = keys.slice(3*i, 3*(i+1));
        let sentence = sKeys.reduce((cur, k) => {
            cur[k] = values[k];
            return cur;
        }, {});

        // Add the sentence
        sentences.push(<Sentence key={i} values={sentence} />);
    }

    return sentences;
}

/**
 * This will render a simple bullet point list.
 */
function renderArray(values) {
    var list = values.map((v, i) => (
        <li key={i}>{capitalize(v)}</li>
    ));

    return (
        <ul>{list}</ul>
    );
}

