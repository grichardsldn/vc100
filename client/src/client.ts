import {io,Socket} from "socket.io-client"
import { LineCommand, DisplayMessage } from '~shared/vc100';


const drawMessage = (displayMessage: DisplayMessage): void => {
  const node = document.createElement("div")
  node.style.position = "fixed"
  node.style.top = `${displayMessage.columnIndex}em`
  node.style.left = `${displayMessage.rowIndex}em`

  // style="position: fixed;top: 1em;left: 15em;"
  const textnode = document.createTextNode(displayMessage.message)
  node.appendChild(textnode);
  document.getElementById("messages")?.appendChild(node);
}

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

socket.on('DISPLAY_MESSAGE', function(displayMessages: DisplayMessage[]) {
  console.log(JSON.stringify(displayMessages, null,2))
  displayMessages.forEach( dm => drawMessage(dm))
  })
