import './App.css';

import React, { useEffect, useState } from 'react'
import Board from './board/board'
import getFont from './font/font'

let font = {}

const App = () => {
    const [displayString, setDisplayString] = useState('');
    
    useEffect(() => {
        console.log('init')
        getFont().then(f => {
            font = f
            const hash = window.location.hash.substring(1) //remove #
            setDisplayString(decodeURIComponent(hash))
        });
    }, []);

    return (
        <div className="App">
            <Board str={displayString} font={font} width={100} />
        </div>
    );
}

export default App;