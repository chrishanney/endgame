import { useState, useEffect } from 'react'
import Header from "./components/Header.jsx"
import Languages from "./languages"

const [langs, setLangs] = useState(Languages);

  const buttons = langs.map(x => {
    return <button color={x.color} backgroundColor={x.backgroundColor}>{x.name}</button>
  })


function App() {
 
  return (
    <>   
    <Header />
    <main>
      <section className="game-status">
        <h2>You won!</h2>
        <p>Well done</p>
      </section>
      <section className="languages">
        {buttons}
      </section>
    </main>
    </>
  )
}

export default App
