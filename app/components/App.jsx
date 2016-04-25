import React from 'react';

import Advert from '../advert';
import Job from './Job';

export default class App extends React.Component {
    render() {
        return (<div>
            <h1>Ethcore Application</h1>
            <Job advert={Advert} />
        </div>);
    }
}
