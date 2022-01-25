import './App.css';

import React, {useState} from 'react'
import Board from './board/board'
import Letter from './board/letter'

const init = async function() {
  let bdf = '';
  await fetch('misaki_gothic.bdf')
  .then(response => response.text())
  .then(data => {
      bdf = data;
  })
  const font: any = {}
  let letter = new Letter(0, [], [], [])
  let bitmapLines = false
  bdf.split(/\n/).forEach(line => {
      const columns = line.split(/\s+/);
      switch (columns[0]) {
          case 'STARTCHAR':
              bitmapLines = false;
              break
          case 'ENCODING':
              letter.encoding = Number(columns[1])
              break
          case 'DWIDTH':
              letter.dwidth = [Number(columns[1]), Number(columns[1])]
              break
          case 'BBX':
              letter.bbx = [Number(columns[1]), Number(columns[2]), Number(columns[3]), Number(columns[4])]
              break
          case 'BITMAP':
              bitmapLines = true
              break
          case 'ENDCHAR':
              font[letter.encoding.toString()] = letter
              letter = new Letter(0, [], [], [])
              break
          default:
              if (bitmapLines) {
                  letter.bitmap.push(columns[0])
              }
      }
  })

  return font
}
let font = {}
init().then(f => {
  font = f
});

const App = () => {
  const [displayString, setDisplayString] = useState('');

  return (
    <div className="App">
      <h2>新幹線の電光掲示板風</h2>
      <p>Reactの練習のために作りました。</p>
      <input type="text" onChange={e => setDisplayString(e.target.value)} placeholder='文字を入力してください。'/>
      <Board str={displayString} font={font} />
    </div>
  );
}

export default App;
// vim: set expandtab ts=2 sts=2 sw=2 :