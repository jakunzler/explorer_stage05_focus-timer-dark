const buttonPlay = document.querySelector('.play')
const buttonPause = document.querySelector('.pause')
const buttonStop = document.querySelector('.stop')
const buttonSet = document.querySelector('.set')
const buttonAdd = document.querySelector('.add')
const buttonSub = document.querySelector('.sub')
const buttonSoundOn = document.querySelector('.sound-on')
const buttonSoundOff = document.querySelector('.sound-off')
const minutesDisplay = document.querySelector('.minutes')
const secondsDisplay = document.querySelector('.seconds')
const selectedCard = document.querySelectorAll('.card')
const buttonSwitchMode = document.querySelector('#switch')
const buttonVolume = document.querySelectorAll('svg + button')

export {
  buttonPlay,
  buttonPause,
  buttonSet,
  buttonAdd,
  buttonSub,
  buttonStop,
  buttonSoundOff,
  buttonSoundOn,
  minutesDisplay,
  secondsDisplay,
  selectedCard,
  buttonSwitchMode,
  buttonVolume
}