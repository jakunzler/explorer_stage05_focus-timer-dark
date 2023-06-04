export default function() {
  
  const buttonPressAudio = new Audio("../assets/sound/audios_button-press.wav")
  const kitchenTimer = new Audio("../assets/sound/audios_kitchen-timer.mp3")
  const bgAudio = {
    "bgAudioChill": new Audio('../assets/sound/chill.mp3'),
    "bgAudioForest": new Audio('../assets/sound/forest.wav'),
    "bgAudioRain": new Audio('../assets/sound/rain.wav'),
    "bgAudioStore": new Audio('../assets/sound/store.wav'),
    "bgAudioFireplace": new Audio('../assets/sound/fireplace.wav')
  }

  bgAudio.bgAudioChill.loop = true
  bgAudio.bgAudioForest.loop = true
  bgAudio.bgAudioRain.loop = true
  bgAudio.bgAudioStore.loop = true
  bgAudio.bgAudioFireplace.loop = true

  function pressButton() {
    buttonPressAudio.play()
  }

  function timeEnd() {
    kitchenTimer.play()
  }

  return {
    pressButton,
    timeEnd,
    bgAudio
  }

}