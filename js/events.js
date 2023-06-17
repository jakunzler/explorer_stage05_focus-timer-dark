import {
  buttonPause,
  buttonPlay,
  buttonSet,
  buttonAdd,
  buttonSub,
  buttonSoundOff,
  buttonSoundOn,
  buttonStop,
  selectedCard,
  buttonSwitchMode,
  buttonVolume
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
    sound.bgAudio[bgAudioEnvironment].volume = 0.5;
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

    if (event_tag == 'div') {
      event_trigger = event.target
    } else if (event_tag == 'svg') {
      event_trigger = event.target.parentElement
    } else if (event_tag == 'path') {
      event_trigger = event.target.parentElement.parentElement
    } else if (event_tag == 'button') {
      return;
    } else if (event_tag == 'span') {
      return;
    };
 
    buttonSoundOn.click();

    let activeCard = document.querySelector('.active');

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

  buttonSwitchMode.addEventListener('click', function() {
    controls.changeMode()
  })

  buttonVolume.forEach( element => element.addEventListener('mousedown', set_volume));
  
  function move_fader() {
    if (event.target.tagName.toLowerCase() != 'button') return;
    const button = event.target; console.log(button);
    let button_position = button.style.left;
    const span = button.nextElementSibling;
    const card = span.parentElement;
    const rect = card.getBoundingClientRect();

    const x_min = rect.left;
    const x_max = rect.right;
    let x = event.clientX - x_min - 7;
    let volume = x / (x_max - x_min); console.log(rect)
    
    if (volume <= 0.05) {
      buttonSoundOn.classList.add('hide');
      buttonSoundOff.classList.remove('hide');
      button.style.left = `5%`;
      sound.bgAudio[bgAudioEnvironment].volume = 0;
    } else if (volume > 0.05 && volume <= 0.85) {
      buttonSoundOn.classList.remove('hide');
      buttonSoundOff.classList.add('hide');
      button_position = 100 * volume;
      button.style.left = `${button_position}%`;
      sound.bgAudio[bgAudioEnvironment].volume = volume;
    } else {
      button.style.left = `85%`;
      sound.bgAudio[bgAudioEnvironment].volume = 1;
    };
  };

  function set_volume() {
    sound.pressButton()

    document.addEventListener('mousemove', move_fader);
    document.addEventListener('mouseup', () => {
      sound.bgAudio[bgAudioEnvironment].play()
      document.removeEventListener('mousemove', move_fader);
    })
  };
};