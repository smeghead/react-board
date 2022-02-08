import Letter from './letter'

let font = {}

const getFont = async () => {
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
export default getFont