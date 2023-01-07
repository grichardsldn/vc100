import {io,Socket} from "socket.io-client"
import { LineCommand, DisplayMessage, TextStyle } from '~shared/vc100';

const emFactorH = 0.5
const emFactorV = 1.0

const clearMessages = () => {
  const messagesElement = document.getElementById("messages")
  if (!messagesElement) {
    console.error(`clearMessages: could not get messages element`)
    return
  }
  messagesElement.textContent = '';
}


const drawMessage = (displayMessage: DisplayMessage): void => {
  const node = document.createElement("div")
  node.style.position = "fixed"
  node.className = `msg${(displayMessage.style == "BIG")?" big":""}` 
  node.style.top = `${displayMessage.rowIndex * emFactorV}rem`
  node.style.left = `${displayMessage.columnIndex * emFactorH}rem`
  node.style.color = displayMessage.colour
  //node.style.width = `${displayMessage.boxLength * emFactorV * (displayMessage.style == Style.BIG?1:2)}rem`

  // style="position: fixed;top: 1em;left: 15em;"
  const textnode = document.createTextNode(displayMessage.message)
  node.appendChild(textnode);
  const messagesElement = document.getElementById("messages")
  if (!messagesElement) {
    console.error(`drawMessage: could not get messages element`)
    return
  }
  messagesElement.appendChild(node);
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
  clearMessages()
  displayMessages.forEach( dm => drawMessage(dm))
  })

const isFullScreen = () => {
  let d = document as any
  var fullscreenElement = d.fullscreenElement || d.mozFullScreenElement ||
    d.webkitFullscreenElement || d.msFullscreenElement;
  return !!fullscreenElement
}

const requestFullscreen = () => {
  let docElm = document.documentElement as any
  if (docElm.requestFullscreen) {
    docElm.requestFullscreen()
  }
  else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen()
  }
  else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen()
  }
  else if (docElm.msRequestFullscreen) {
      docElm.msRequestFullscreen()
  } else {
    console.log(`No requestFullscreen found`)
  }
}

const exitFullscreen = () => {
  let d = document as any
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (d.mozExitFullscreen) {
      d.mozExitFullscreen()
    } else if (d.webkitExitFullscreen) {
      d.webkitExitFullscreen()
    } else if (d.msExitFullscreen) {
      d.msExitFullscreen()
    }
} 

window.addEventListener('DOMContentLoaded', (event) => {
  const button = document.getElementById('messages')
  if (!button) {
    console.log(`Element for fullscreen not found`)
    return
  }

  button.addEventListener('click', () => {
    console.log(`GDR: click!`)
    let docElm = document.documentElement as any
    if (!isFullScreen()) {
      requestFullscreen()
    } else {
      exitFullscreen()
    }
  })
});


