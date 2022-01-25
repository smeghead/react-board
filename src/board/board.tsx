import React, {useState, useEffect } from 'react'
import Line from './line'
import Letter from './letter'

const boardStyle = {
  margin: '5px auto',
  width: 500,
  height: 100,
  backgroundColor: 'black',
};

const generateBuffer = (str: string, font: {[name: string]: Letter}) => {
    const buffer = ['', '', '', '', '', '', '', '', '', '']
    if (!font) {
        return buffer;
    }
    str += '    '; //文と文の繰り返し時の隙間を作る
    str.split('').forEach(s => {
      const charCode: string = s.charCodeAt(0).toString()
      if (!(font[charCode])) {
        console.log('no kye', charCode, font[charCode])
        return
      }
      const letter = font[charCode]
      letter.getBuffer().forEach((line: string, i: number) => {
        buffer[i] += line
      })
    })

    return buffer;
};

const Display = (props: {str: string, font: {[name: string]: Letter}}) => {
  const [buffer, setBuffer] = useState(generateBuffer(props.str, props.font))
  const [offset, setOffset] = useState(50)
  useEffect(() => {
    setBuffer(generateBuffer(props.str, props.font))
  }, [props]);

  useEffect(() => {
    if (Object.keys(props.font).length === 0) {
      return;
    }
    const timerId = setTimeout(() => {
      setOffset(offset - 1)
    }, 50)
    return () => clearTimeout(timerId)
  }, [offset, props.font])

  return (
    <div className="Board" style={boardStyle}>
      {[...Array(10).keys()].reverse().map(i => <Line key={i} buffer={buffer[i]} offset={offset} />)}
    </div>
  );
}

export default Display;
// vim: set expandtab ts=2 sts=2 sw=2 :