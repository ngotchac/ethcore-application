import React from 'react';

import Section from './Section';

export default class App extends React.Component {
    render() {
        var Advert = this.props.advert;

        return (
            <div>
                <h2>{Advert.headline}</h2>
                <Section value={Advert.essentials} name="essentials" />
            </div>
        );
    }
}
