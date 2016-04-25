import React from 'react';

import Essentials from './Essentials';

export default class App extends React.Component {
    render() {
        var Advert = this.props.advert;

        return (
            <div>
                <h2>{Advert.headline}</h2>
                <Essentials value={Advert.essentials} />
            </div>
        );
    }
}
