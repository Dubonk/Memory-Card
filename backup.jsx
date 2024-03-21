import { useEffect } from "react";
import { useState } from "react"

function Cards() {
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        fetchPokemon();
    }, []);

    const fetchPokemon = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12&offset=0')
            const data = await response.json()
            setPokemon(data.results)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <div className="cardsContainer">
            {pokemon.map(async (poke, index) => {
                const response = await fetch(poke.url);
                const pokemonData = await response.json();
                return (
                    <div key={index}>
                        <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
                        <p>{pokemonData.name}</p>
                    </div>
                );
            })}
        </div>
        </>
    )
}

export { Cards }