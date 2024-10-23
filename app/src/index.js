// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import SolarSystem from './components/SolarSystem';

const App = () => {
    return (
        <div>
            <SolarSystem />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
