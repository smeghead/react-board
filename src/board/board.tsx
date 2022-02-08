import React, {useState, useEffect } from 'react'
import Line from './line'
import Letter from '../font/letter'

const boardStyle = {
  width: '100vw',
  height: '10vw',
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
        // console.log('no key', s, charCode, font[charCode])
        return
      }
      const letter = font[charCode]
      letter.getBuffer().forEach((line: string, i: number) => {
        buffer[i] += line
      })
    })

    return buffer;
};

type Props = {
  str: string;
  font: {[name: string]: Letter};
  width: number;
  expired: boolean;
}
const Board = (props: Props) => {
  const [buffer, setBuffer] = useState(generateBuffer(props.str, props.font))
  const [offset, setOffset] = useState(props.width)
  useEffect(() => {
    setBuffer(generateBuffer(props.str, props.font))
  }, [props]);

  useEffect(() => {
    if (Object.keys(props.font).length === 0) {
      return;
    }
    if (props.expired) {
      return;
    }
    const timerId = setTimeout(() => {
      setOffset(offset - 1)
    }, 50)
    return () => clearTimeout(timerId)
  }, [offset, props.font])

  return (
    <div className="Board" style={{...boardStyle}}>
      {[...Array(10).keys()].reverse().map(i => <Line key={i} buffer={buffer[i]} offset={offset} width={props.width} />)}
    </div>
  );
}

export default Board;
// vim: set expandtab ts=2 sts=2 sw=2 :