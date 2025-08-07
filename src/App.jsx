import { useState, useEffect } from 'react'
import Header from "./components/Header.jsx"
import { languages } from "./languages"
import { words } from "./words"
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
  const [currentWord, setCurrentWord] = useState(() => words[Math.ceil(Math.random() * 200)].toUpperCase());
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const [keys, setKeys] = useState(
    () => alphabet.split('').map(
      x => ({value: x.toUpperCase(), isPressed: false, id: x})
    )
  )

  const keyboard = keys.map((x) =>
    <Key className="keyboard-key" key={x.id} value={x.value} isPressed={x.isPressed} toggleKey={() => pressKey(x.id)}/>
  )

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
  
  const gameOverWon = letters.reduce(
    (total, current) => total && current.isShown, true
  )
  const gameOverLost = (missedLetters >= 8) ? true : false

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


  useEffect(()=> {
    setKeys(prev =>
      prev.map(x =>
      ({...x, isPressed: false})
      )
    )}, [currentWord])
  
  // iterates through keys to find if the matching key has not yet been pressed, and if so updates the keyboard
  // otherwise returns having done nothing to avoid rerender
  function pressKey(id) {
    for(let x of keys) {
      if(gameOverWon || gameOverLost || (x.id === id && x.isPressed == true)) { 
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
  function newGame() {
    setCurrentWord(words[Math.ceil(Math.random() * 200)].toUpperCase())
  }
  return (
    <>   
    <Header />
    <main>
      <section className="game-status">
        {gameOverWon ?  (<div>
        <h2>You won!</h2>
        <p>Well done</p></div>) : null} 
        {gameOverLost ? (<div>
          <h2>YOU LOST</h2>
          <p>F in the chat</p>
        </div>) : null}
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
      {(gameOverWon || gameOverLost) ? 
      <button className="new-game" onClick={newGame}>New Game</button> : null
      }

    </main>
    </>
  )
}

export default App
