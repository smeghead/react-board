import React, { useState, useEffect } from 'react'

const dotStyle = {
  float: 'left',
  width: '8px',
  height: '8px',
  margin: '1px',
  borderRadius: '5px',
  background: '#333',
}

const Line = (props: { buffer: string, offset: number }) => {
  const [buffer, setBuffer] = useState<string>('')
  useEffect(() => {
    setBuffer(props.buffer)
  }, [props]);

  const lightning = (x: number, offset: number) => {
    if (!buffer) {
      return '#333';
    }
    let virtualScreenBuffer = ''
    if (offset >= 0) {
      virtualScreenBuffer = '0'.repeat(offset) + buffer
    } else {
      virtualScreenBuffer = buffer.substring((offset % buffer.length) * -1)
    }
    // 繰り返し
    while (virtualScreenBuffer.length < 50) {
      virtualScreenBuffer += buffer
    }
    // console.log(virtualScreenBuffer)
    if (virtualScreenBuffer.substring(x, x + 1) === '1') {
      return 'radial-gradient(farthest-corner at 8px 8px, #ffffff 0, #fa8916 70%, #f87d02 100%)';
    }
    return '#333';
  };
  return (
    <div className="Line">
      {[...Array(50).keys()].map(i => <div key={i} className="dot-off" style={{ ...dotStyle, background: lightning(i, props.offset) }} />)}
    </div>
  );
}

export default Line;
// vim: set expandtab ts=2 sts=2 sw=2 :