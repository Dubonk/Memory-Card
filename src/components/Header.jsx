function Header() {
    return (
        <div className="header">
            <div className="gameRules">
        <h1>Memory Card Game!</h1>
        <p>Get points by clicking an image but don&apos;t click on any more than once!</p>
        </div>
        <div className="scores">
            <h4>Score:</h4>
            <h4>Best Score:</h4>
        </div>
        </div>
    )
}

export { Header }