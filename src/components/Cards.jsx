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
            console.log(pokemon)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="cardsContainer">
                {pokemon.map((poke, index) => (
                    <div className="pokemonCard" key={index}>
                        <img src={poke.sprites.other.dream_world.front_default} alt={poke.name} />
                    </div>
                ))}
            </div>
        </>
    )
}

export { Cards };
