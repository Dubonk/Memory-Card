import { useEffect, useState } from "react";

function RandomFacts() {
    const [pokeFact, setPokeFact] = useState('');
    const [ranNum, setRanNum] = useState(1);
    const [pokemonName, setPokemonName] = useState('');



        useEffect(() => {
            const fetchPokeFact = async () => {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${ranNum}/`);
                    const pokeData = await response.json();
                    const pokemonResult = pokeData;
                    const pokeName = pokemonResult.name;
                    const ranPokeFact = pokemonResult.flavor_text_entries[2].flavor_text;
                    setPokeFact(ranPokeFact);
                    setPokemonName(pokeName);
                    console.log(pokemonResult);
                } catch (error) {
                    console.log(error);
                }
            }
            fetchPokeFact();
        }, [ranNum]);

        function getFact() {
            let randomNum = Math.floor(Math.random() * 481)
            setRanNum(randomNum);
        }

        return (
            <div className="pokemonFacts">
                <h3>Pokemon Facts!</h3>
                <h4>{pokemonName}:</h4>
                <p>{pokeFact}</p>
                <button id="factButton" onClick={() => getFact()}>Get a Fact!</button>
            </div>
        )
}

export { RandomFacts }