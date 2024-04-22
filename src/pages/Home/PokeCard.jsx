import PropTypes from "prop-types"
import { Link } from "react-router-dom";

function PokeCard(props){

    function capitalize (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const handleCry = (pokemon) => {
        let audio = new Audio(pokemon.cries.latest)
        audio.play();
    }

    const types = props.pokemon.types.map(t => (t.type.name)) 

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

    const typeChart = (key, type) => (
        <div key={key} 
        className={`${typeColors[type]} px-2 py-1 border-solid border-2 rounded-lg text-[11px] bg`}>
            {capitalize(type)}
        </div>
    );

    return(
        <Link to={`/PokemonDetails/${props.index}`} state={{pokemon: props.pokemon}} className="lg:w-[12%] md:w-[20%] sm:w-1/4">
        <div key={props.index} className="max-w-40 rounded overflow-hidden shadow-lg bg-gray-200 hover:scale-105 transition duration-300 p-0"
        /* onClick={() => handleCry(props.pokemon)} */>
            <img className="size-40" src={ props.shiny ? props.pokemon.sprites.front_shiny : props.pokemon.sprites.front_default} alt={props.pokemon.name}/>
            <div className="flex flex-col items-center justify-center px-2 py-1 text-center bg-cyan-400 text-blue-950 border-y-2 border-blue-950 font-bold text-md">
                <div>{`#${props.pokemon.id}`}</div>
                <div>{capitalize(props.pokemon.name)}</div>
            </div>
            <div className="px-2 py-2 pb-2 flex flex-row gap-2 justify-center bg-cyan-300">
                {types.map((type, index) => typeChart(index, type))}
            </div>
        </div>
        </Link>
    )
}

PokeCard.propTypes = {
    index: PropTypes.number,
    pokemon: PropTypes.object,
    shiny: PropTypes.bool,
}

export default PokeCard