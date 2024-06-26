import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import StatChart from "./StatChart";

function PokemonDetails(){
    const location = useLocation();
    const pokemon = location.state.pokemon;
    
    const [loading, setLoading] = useState(true);
    const [moves, setMoves] = useState([]);

    const typeColors = {
        "fire": "bg-red-500 text-white",
        "water": "bg-blue-500 text-white",
        "grass": "bg-green-600 text-white",
        "electric": "bg-yellow-400 text-gray-900 border-gray-900",
        "rock": "bg-yellow-950 text-white",
        "ground": "bg-yellow-700 text-white",
        "ice": "bg-blue-300 text-blue-950 border-blue-950",
        "normal": "bg-gray-500 text-white",
        "fighting": "bg-orange-800 text-white",
        "flying": "bg-cyan-100 text-gray-900 border-gray-900",
        "poison": "bg-purple-600 text-purple-100 border-purple-100",
        "bug": "bg-lime-400 text-green-950 border-green-950",
        "steel": "bg-slate-400 text-slate-950 border-slate-950",
        "psychic": "bg-pink-600 text-white",
        "dark": "bg-gray-950 text-gray-100 border-gray-100",
        "ghost": "bg-indigo-400 text-indigo-950 border-indigo-950",
        "fairy": "bg-pink-200 text-violet-950 border-violet-950",
        "dragon": "bg-blue-900 text-blue-100 border-blue-100"
    };

    const handleCry = (pokemon) => {
        let audio = new Audio(pokemon.cries.latest)
        audio.play();
    }

    useEffect(() => {
        fetchMovesData();
        console.log(pokemon)
    }, []);


    const fetchMovesData = async () => {
        try{
            setLoading(true);
            const moveUrls = pokemon.moves.map(m => m.move.url);
            const movePromises = moveUrls.map(url => axios.get(url));
            const moveResponses = await Promise.all(movePromises);
            const movesData = moveResponses.map(res => res.data);
            setMoves(movesData);
            setLoading(false)
        }catch(err){
            console.log(err);
        }
    };

    const capitalize = (str) => {
        return str.split("-")
                .map(s => s.charAt(0).toUpperCase() + s.slice(1))
                .join("-");
    }

    const moveCard = (move, key) => 
        <div key={key}
        className={`${typeColors[move.type.name]} rounded-md p-1 border-[3px] w-40 text-[13px]`}>
            <div>{capitalize(move.name)}</div>
            <div>{move.type.name}</div>
            <div></div>
        </div>

    if (loading) {
        return (
            <div>loading...</div>
        );
    }

    return(
        <>
        

        <div className="flex flex-col justify-center justify-items-center items-center text-black text-center">
            <span
            className="text-3xl mt-3 p-5 bg-gray-200 rounded-xl text-blue-950 border-blue-950 border-[5px]"
            >#{pokemon.id} {capitalize(pokemon.name)}</span>
            <img 
            className="size-80" 
            src={pokemon.sprites.other["official-artwork"].front_default}
            onClick={() => handleCry(pokemon)}
            />
            <div>{pokemon.types.map((t, i) => <span key={i}>{t.type.name} </span>)}</div>
            <div>Height: {pokemon.height}</div>
            <div>Weight: {pokemon.weight}</div>
            <div 
            className="flex flex-wrap justify-center items-center gap-4">
            {moves.slice(0, 20).map((m, i) => moveCard(m,i))}
            </div>
            <div>
                {pokemon.abilities.map((a,i) => 
                <span key={i}>{a.ability.name} </span>)}
            </div>
            <div
            className="min-w-96">
            <StatChart
            labels={pokemon.stats.map(s => s.stat.name)}
            data={pokemon.stats.map(s => s.base_stat)}
            ></StatChart>
            </div>
        </div>
        </>
    );
}

export default PokemonDetails;