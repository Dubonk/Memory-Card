function Header({ score, highScore, setHighScore }) {
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
        </div>
        </div>
    )
}

export { Header }