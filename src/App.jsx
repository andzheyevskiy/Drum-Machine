import { useEffect, useState } from 'react'
import './App.css'

function App() {
  //Manage the power button
  const [power, setPower] = useState(true)

  // Get/Set sound tittle on #display
  const [title, setTitle] = useState("")
  
  //Get/Set volume for the slider and #display
  const [volume, setVolume] = useState(50)

  // Array colectin al button keys, name and sound location
  const audios = [
    {
      button: "Q",
      name: "Heater 1",
      sound: "assets/sounds/Heater-1.mp3"
    },
    {
      button: "W",
      name: "Heater 2",
      sound: "assets/sounds/Heater-2.mp3"
    },
    {
      button: "E",
      name: "Heater 3",
      sound: "assets/sounds/Heater-3.mp3"
    },
    {
      button: "A",
      name: "Heater 4",
      sound: "assets/sounds/Heater-4_1.mp3"
    },
    {
      button: "S",
      name: "Clap",
      sound: "assets/sounds/Heater-6.mp3"
    },
    {
      button: "D",
      name: "Open HH",
      sound: "assets/sounds/Dsc_Oh.mp3"
    },
    {
      button: "Z",
      name: "Kick n' Hat",
      sound: "assets/sounds/Kick_n_Hat.mp3"
    },
    {
      button: "X",
      name: "Kicked",
      sound: "assets/sounds/RP4_KICK_1.mp3"
    },
    {
      button: "C",
      name: "Closed HH",
      sound: "assets/sounds/Cev_H2.mp3"
    }
  ]

  // Function to change the state of power. Used on .pwr-button
  function changePower() {
    setPower(!power)
  }

  return (
    <>
      <h1>Drum Machine</h1>
      <div id='drum-machine'>
        <div className='button-wrapper'>
          {audios.map(e => <Buttons key={e.name} btn={e} power={power} volume={volume} setTitle={setTitle} />)}
        </div>
        <section className='configuration-wrapper'>
          <div onClick={changePower} className={`pwr-button ${power ? "on" : "off"}`}>
            POWER
          </div>
          <p id='display'>{title}</p>
          <VolumeSlider volume={volume} setVolume={setVolume} setTitle={setTitle} />
        </section>
      </div>
    </>
  )
}

function Buttons(props) {

  //Function to play sound
  function playSound() {
    if (props.power === true) {
      props.setTitle(props.btn.name)
      const button = document.getElementById(`btn-${props.btn.button}`)
      button.classList.add("click")
      const audio = document.getElementById(props.btn.button)
      audio.volume = props.volume / 100
      audio.play()
      setTimeout(() => { button.classList.remove("click") }, 300)
    }
  }

  // Named function to play sound and work with an event listeners. 
  function playFromEvent(event) {
    if (event.key.toLocaleUpperCase() === props.btn.button) { playSound() }
  }

  //Event listeners, mounted only when power is on. 
  useEffect(() => {
    document.addEventListener("keydown", playFromEvent)
    return () => document.removeEventListener("keydown", playFromEvent)
  },)

  return (
    <>
      <button id={`btn-${props.btn.button}`} className='drum-pad' onClick={playSound}>
        <audio id={props.btn.button} className="clip" src={props.btn.sound} ></audio>
        {props.btn.button}
      </button>

    </>
  )
}
function VolumeSlider(props) {

  // Controlled imput for the slider
  function volumeHandler(event) {
    props.setVolume(event.target.value)
    props.setTitle("Volume: " + event.target.value)
    setTimeout(() => props.setTitle(""), 1500)
  }

  return (
    <input type="range" name="volume" id="volume" max="100" min="0" onChange={volumeHandler} value={props.volume} />
  )
}

export { App }