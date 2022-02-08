import './App.css';

import React, { useEffect, useState, useRef } from 'react'
import Board from './board/board'
import getFont from './font/font'
import {base64Decode, base64Encode} from './base64'

let font = {}

const App = () => {
    const [displayString, setDisplayString] = useState('')
    const [expired, setExpired] = useState(false)
    const inputRef = useRef(null)

    useEffect(() => {
        console.log('init')
        getFont().then(f => {
            font = f
            const hash = window.location.hash.substring(1) //remove #
            const base64 = base64Decode(hash, 'UTF-8')
            base64.then(val => setDisplayString(val as string))
            setTimeout(() => setExpired(true), 1000 * 60)
        });
    }, []);

    const generateHandler = () => {
        console.log('generateHandler')
        base64Encode([inputRef.current?.value]).then(val => {
            window.location.href = '/#' + val
            window.location.reload()
        })

    }
    return (
        <div className="App">
            <Board str={displayString} font={font} width={100} expired={expired} />
            <div className='footer'>
                &copy; @smeghead
                <input type="text" ref={inputRef} />
                <button onClick={generateHandler}>generate</button>
            </div>
        </div>
    );
}

export default App;