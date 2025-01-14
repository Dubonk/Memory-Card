import { useEffect, useState } from "react";
import loadingGif from '../gifs/5Q0v.gif';
import PropTypes from 'prop-types';


function Cards({score, setScore, highScore, setHighScore, offset, clickedPokemon, setClickedPokemon}) {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isClicked, setClicked] = useState(false);
    const [gameStart, setGameStart] = useState(false);


    Cards.propTypes = {
        setScore: PropTypes.func,
        setClickedPokemon: PropTypes.func,
        score: PropTypes.number,
        highScore: PropTypes.number,
        setHighScore: PropTypes.func,
        setOffset: PropTypes.func,
        offset: PropTypes.number,
        clickedPokemon: PropTypes.array
      };

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setLoading(true);
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
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        }
        fetchPokemon();
    }, [offset]);

    function shuffleCards() {
        let currentIndex = pokemon.length - 1;
        let randomIndex;
        let mixedPokemon = [...pokemon];
        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * (currentIndex + 1));
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

    const playPokemonCry = (index) => {
        const audio = new Audio(pokemon[index].cries.latest);
        audio.volume = 0.1;
        audio.play();
    }

    const startGame = () => {
        setGameStart(true);
    }
 
    const handleClick = (index, name) => {
        playPokemonCry(index)
        setClicked(true);
        setTimeout(() => {
            shuffleCards();
        }, 500);
        setTimeout(() => {
            updateScores(name);
            setClicked(false);
        }, 1000);    
    }

    return (
        <>
        {!gameStart ? <button className="playBtn" onClick={() => startGame()}>Play</button> :  
            <div className="cardsContainer">
                
                    {loading ? <img id="loading" src={loadingGif} alt="loading..." /> : 
                    pokemon.map((poke, index) => (
                        <div key={poke.name} className={`pokemonCard ${isClicked ? 'flip' : ''}`}>
                            <div className={`front`}>
                                <img onClick={() => handleClick(index, poke.name)} src={poke.sprites.other.dream_world.front_default} alt={poke.name} />
                                </div>
                            <div className="back"></div>
                        </div>
                    ))
                }
            </div>
            }
        </>
    )
}
export { Cards };
