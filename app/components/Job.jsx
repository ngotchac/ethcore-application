import React from 'react';

import RadarSection from './RadarSection';
import Section from './Section';

export default class App extends React.Component {
    render() {
        var Advert = this.props.advert;

        return (
            <div>
                <h2>{Advert.headline}</h2>
                <Section value={Advert.essentials} name="essentials" />
                <Section value={Advert.methodology} name="methodology" />
                <Section value={Advert.specs} name="specifications" />
                <Section value={Advert.profile} name="profile" />
                <Section value={Advert.equipment} name="equipment" />
                <RadarSection value={Advert.technologies} name="technologies" />
                <Section value={Advert.misc} name="misc" />
                <Section value={Advert.other} name="other" />
            </div>
        );
    }
}
