function Header({ score, highScore, setHighScore, setOffset }) {
    function handleRandom() {
        let randomNum = Math.floor(Math.random() * 139)
        setOffset(randomNum);
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