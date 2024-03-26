import { Header } from './components/Header'
import { Cards } from './components/Cards'
import './styles/App.css'
import { useEffect, useState } from 'react';

function App() {
  const [clickedPokemon, setClickedPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const localHighScore = localStorage.getItem("HighScore")
    if(localHighScore === null) return 0;

    return JSON.parse(localHighScore)
  });

  useEffect(() => {
    localStorage.setItem("HighScore", JSON.stringify(highScore))
  }, [highScore])

  return (
    <>
    <Header setScore={setScore} setClickedPokemon={setClickedPokemon} score={score} highScore={highScore} setHighScore={setHighScore} setOffset={setOffset} offset={offset} />
    <Cards clickedPokemon={clickedPokemon} setClickedPokemon={setClickedPokemon} score={score} setScore={setScore} highScore={highScore} setHighScore={setHighScore} offset={offset} />
    </>
  )
}

export default App
