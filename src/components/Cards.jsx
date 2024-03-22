import { useEffect, useState } from "react";

function Cards() {
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        fetchPokemon();
    }, []);

    const fetchPokemon = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12&offset=0');
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
        //code will scramble the card divs in a random order.
    }

    const handleClick = (index, name) => {
        //if card is clicked for the first time, add a point to score and mark card as clicked
        //if same card is clicked again, score = 0 and mark all cards as unclicked.
        console.clear('');
        console.log(name, index)
        shuffleCards();
    }

    return (
        <>
            <div className="cardsContainer">
                {pokemon.map((poke, index) => (
                    <div className="pokemonCard" key={index}>
                        <img onClick={() => handleClick(index, poke.name)} index={index} src={poke.sprites.other.dream_world.front_default} alt={poke.name} />
                    </div>
                ))}
            </div>
        </>
    )
}
//
export { Cards };
