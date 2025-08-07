import { useState, useEffect } from 'react'
import Header from "./components/Header.jsx"
import { languages } from "./languages"
import Key from "./components/Key.jsx"

// const [langs, setLangs] = useState(languages);
/* TO DO:

have a useEffect based on Keys? Use this to update the other two sections? Display and tiles?
or could just have both the word

there's an order
check if letter is in the word (use currentWord)
if it is, call function to update letterdisplay
if it is not, update tiles
*/

function App() {

  const [currentWord, setCurrentWord] = useState("REACT");
  const [gameOver, setGameOver] = useState(false);
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const [keys, setKeys] = useState(
    () => alphabet.split('').map(
      x => ({value: x.toUpperCase(), isPressed: false, id: x})
    )
  )
  console.log(keys)
  const keyboard = keys.map((x) =>
    <Key className="keyboard-key" key={x.id} value={x.value} isPressed={x.isPressed} toggleKey={() => pressKey(x.id)}/>
  )
  console.log("rendered!")

  const missedLetters = keys.reduce(
    (total, current) => (current.isPressed) && (!currentWord.includes(current.value)) ? total + 1 : total, 0
  )

  const letters = currentWord.split('').map(
    x => {
      for (let y of keys) {
        if (y.isPressed && (y.value === x)) { return {value: x, isShown: true}}
      }
      return {value: x, isShown: false}
    }
  )

  const tiles = letters.map((x, index) =>
    <span className="tile" key={index}>{x.isShown ? x.value.toUpperCase() : ""}</span>
  )

  const chips = languages.map((x, index) => {
    const style = {
      color: x.color,
      backgroundColor: x.backgroundColor
    }
    return <span className="chip" key={x.name} style={style}>
      {(index >= missedLetters) ? x.name : "XXX"} 
      </span>      
  })

 




  // iterates through keys to find if the matching key has not yet been pressed, and if so updates the keyboard
  // otherwise returns having done nothing to avoid rerender
  function pressKey(id) {
    for(let x of keys) {
      if(x.id === id && x.isPressed == true) { 
        return;}
    }
    setKeys(prev => {

      return (prev.map(x =>
        {
          return (x.id === id) ? {...x, isPressed: true} : x
        }
      )
    )})
  }

  return (
    <>   
    <Header />
    <main>
      <section className="game-status">
        <h2>You won!</h2>
        <p>Well done</p>
      </section>

      <section className="language-chips">
        {chips}
      </section>

      <section className="word">
        {tiles}
      </section>
      <section className="keyboard">
        {keyboard}
      </section>
      {gameOver ? 
      <button className="new-game">New Game</button> : null
      }

    </main>
    </>
  )
}

export default App
