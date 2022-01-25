class Letter {
  encoding: number;
  dwidth: number[];
  bbx: number[];
  bitmap: string[];

  constructor(encoding: number, dwidth: number[], bbx: number[], bitmap: string[]) {
    this.encoding = encoding
    this.dwidth = dwidth
    this.bbx = bbx
    this.bitmap = bitmap
  }

  getBuffer() {
    const buffer = ['', '', '', '', '', '', '', '', '', '']

    let i = 0
    for (; i < this.bbx[3] + 2; i++) {
      buffer[i] += this.dwidth[0] === 4 ? '0000' : '00000000';
    }
    this.bitmap.concat().reverse().forEach(dex => {
      buffer[i++] += parseInt(dex, 16).toString(2).padStart(8, '0').substring(0, this.dwidth[0])
    })
    for (; i < 10; i++) {
      buffer[i] += this.dwidth[0] === 4 ? '0000' : '00000000';
    }
    return buffer;
  }
}
export default Letter;
