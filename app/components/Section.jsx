import React from 'react';

import Sentence from './Sentence';
import styles from './Section.less';

export default class Section extends React.Component {
    render() {
        var values = this.props.value;
        if (this.props.name) {
            var name = <h3>{capitalize(this.props.name)}</h3>;
        }

        var keys = Object.keys(values),
            sentences = [],
            wordsPerSentence = 3;

        var NSentences = Math.ceil(keys.length / wordsPerSentence);

        for (let i = 0; i < NSentences; i++) {
            // Get the keys for the sentence
            let sKeys = keys.slice(3*i, 3*(i+1));
            let sentence = sKeys.reduce((cur, k) => {
                cur[k] = values[k];
                return cur;
            }, {});

            sentences.push(<Sentence key={i} values={sentence} />);
        }

        return (
            <div className={styles.className}>
                {name}
                {sentences}
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
