import {
  buttonPause,
  buttonPlay,
  buttonSet,
  buttonAdd,
  buttonSub,
  buttonSoundOff,
  buttonSoundOn,
  buttonStop,
  selectedCard
} from "./elements.js"

let bgAudioEnvironment = 'bgAudioChill'

export default function({controls, timer, sound}) {

  buttonPlay.addEventListener('click', function() {
    controls.play()
    timer.countdown()
    sound.pressButton()
  })

  buttonPause.addEventListener('click', function() {
    controls.pause()
    timer.hold()
    sound.pressButton()
  })

  buttonStop.addEventListener('click', function() {
    controls.reset()
    timer.reset()
    sound.pressButton()
  })

  buttonSoundOff.addEventListener('click', function() {
    buttonSoundOn.classList.remove('hide')
    buttonSoundOff.classList.add('hide')
    sound.bgAudio[bgAudioEnvironment].play()
  })
  
  buttonSoundOn.addEventListener('click', function() {
    buttonSoundOn.classList.add('hide')
    buttonSoundOff.classList.remove('hide')
    sound.bgAudio[bgAudioEnvironment].pause()
  })

  buttonSet.addEventListener('click', function() {
    let newMinutes = controls.getMinutes()

    if (!newMinutes) {
      timer.reset()
      return
    }

    timer.updateDisplay(newMinutes, 0)
    timer.updateMinutes(newMinutes)
  })

  buttonAdd.addEventListener('click', function() {
    timer.addMinutes()
  })

  buttonSub.addEventListener('click', function() {
    timer.subMinutes()
  })

  selectedCard.forEach( element => element.addEventListener('click', function() {

    let event_trigger;
    let event_tag = event.target.tagName.toLowerCase();
    buttonSoundOn.click();

    if (event_tag == 'div') {
      event_trigger = event.target
    } else if (event_tag == 'svg') {
      event_trigger = event.target.parentElement
    } else if (event_tag == 'path') {
      event_trigger = event.target.parentElement.parentElement
    }
 
    let activeCard = document.querySelector('.active')

    if (activeCard && activeCard.id == event_trigger.id) {
      event_trigger.classList.toggle('active')

    } else if(activeCard && activeCard.id != event_trigger.id) {
      activeCard.classList.toggle('active')
      event_trigger.classList.toggle('active')

    } else {
      event_trigger.classList.toggle('active')
    }

    //update bg audio
    let environment = document.querySelector('.active') ? document.querySelector('.active').id : 'chill'
    environment = environment[0].toUpperCase() + environment.slice(1)

    bgAudioEnvironment = 'bgAudio' + environment
  }))

}