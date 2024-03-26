import { useEffect, useState } from "react";


function Cards({score, setScore, highScore, setHighScore, offset}) {
    const [pokemon, setPokemon] = useState([]);
    const [clickedPokemon, setClickedPokemon] = useState([]);
    

    useEffect(() => {
        fetchPokemon();
    }, [offset]);

    const fetchPokemon = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offset}`);
            const data = await response.json();
            const pokemonResults = data.results;
            const pokemonDetails = await Promise.all(pokemonResults.map(async (poke) => {
                const response = await fetch(poke.url);
                return response.json();
            }));
            setPokemon(pokemonDetails);
        } catch (error) {
            console.log(error);
        }
    }

    function shuffleCards() {
        let currentIndex = pokemon.length - 1; // Initialize currentIndex to the last valid index
        let randomIndex;
        let mixedPokemon = [...pokemon];
        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * (currentIndex + 1)); // +1 to include the currentIndex
            currentIndex--;
            [mixedPokemon[currentIndex], mixedPokemon[randomIndex]] = [
                mixedPokemon[randomIndex], mixedPokemon[currentIndex]
            ];
        }
        return setPokemon(mixedPokemon);
    }
    
    function updateScores(name) {
        if(clickedPokemon.includes(name)) {
            if(score > highScore) {
                setHighScore(score);
            }
            alert(`${name} was already clicked!`)
            setScore(0)
            setClickedPokemon([]);
        }
        else {
            const newClickedPokemon = [...clickedPokemon, name];
            setClickedPokemon(newClickedPokemon);
        if(score == 11) {
            alert("Perfect Score!")
            setHighScore(12)
            setScore(0)
            setClickedPokemon([]); 
        } else {
        setScore(score + 1)
            }
        }
    }

    const handleClick = (index, name) => {
        shuffleCards();
        updateScores(name);
    }

    return (
        <>
            <div className="cardsContainer">
                {pokemon.map((poke, index) => (
                    <div className="pokemonCard" key={poke.name}>
                        <img onClick={() => handleClick(index, poke.name)} src={poke.sprites.other.dream_world.front_default} alt={poke.name} />
                    </div>
                ))}
            </div>
        </>
    )
}
//
export { Cards };
