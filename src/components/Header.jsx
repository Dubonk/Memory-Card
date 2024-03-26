function Header({ score, highScore, setHighScore, setOffset, setClickedPokemon, setScore }) {
    function handleRandom() {
        let randomNum = Math.floor(Math.random() * 481)
        setOffset(randomNum);
        setClickedPokemon([]);
        if(score > highScore) {
            setHighScore(score);
        }
        setScore(0);
    }

    return (
        <div className="header">
            <div className="gameRules">
        <h1 className="title">Memory Card Game!</h1>
        <p className="rules">Get points by clicking an image but don&apos;t click on any more than once!</p>
        </div>
        <div className="scores">
            <h4>Score: {score}</h4>
            <h4>Best: {highScore}</h4>
            <button id="reset" onClick={() => setHighScore(0)}>Reset</button>
            <button id="randomize" onClick={() => handleRandom()}>Randomize</button>
        </div>
        </div>
    )
}

export { Header }