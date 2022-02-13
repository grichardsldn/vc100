import {io,Socket} from "socket.io-client"
import { LineCommand } from '~shared/vc100';

var socket = io()
const screen = new Array<string>(25).fill('');
socket.on('background', function(colour: string) {
  console.log(`background: ${colour}`)
document.body.style.backgroundColor = colour
})
const render = (lines: string[]) => {
return lines.reduce((acc, cur) => acc.concat(`${cur}\n`), '')
}

socket.on('line', function(line: LineCommand) {
screen[line.line -1] = line.string
console.log(line)
const screenElement = document.getElementById(`screen`)
if (screenElement) { 
  screenElement.textContent = render(screen)
}
})
