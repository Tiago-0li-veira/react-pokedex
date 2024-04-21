import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { useEffect, useState } from "react"

function Navbar(props){

const [randId, setRandId] = useState(0);

    const handleRand = () => {
        const rand = Math.floor(Math.random()*props.data.length);
        setRandId(rand);
    }

    useEffect(() => {
        handleRand();
        console.log()
    }, [])

    const handleShiny = () => {
        if (props.shiny) props.setShiny(false) 
        else props.setShiny(true)
    }

    return(
        <div className="w-full h-24 flex justify-evenly align-middle items-center bg-red-500 border-b-8 border-white shadow-md">
            <img 
            className="h-12" 
            src="https://seeklogo.com/images/P/Pokemon-logo-497D61B223-seeklogo.com.png"
            />
            <button
            className="btn border-0 rounded-xl p-2 transition-all duration-300 hover:bg-white hover:text-red-400 bg-red-300 text-white" 
            onClick={handleShiny}>Shiny</button>
            <Link to={`/PokemonDetails/${randId}`} state={{pokemon: props.data[randId]}}>
            <button 
            className="btn border-0 rounded-xl p-2  transition-all duration-300 hover:bg-white hover:text-red-400 bg-red-300 text-white"
            >
                Random!
            </button>
            </Link>
            <input
                className="h-10 w-40 rounded-xl px-3 focus:scale-105 transition-all duration-300 focus:outline-none bg-red-400 text-white placeholder-white" 
                type="text"
                placeholder="Search Pokémon..."
                onChange={(e) => props.setSearchQuery(e.target.value)}>
            </input>
        </div>    
    )
}

Navbar.propTypes = {
    searchQuery: PropTypes.string,
    setSearchQuery: PropTypes.func,
    shiny: PropTypes.bool,
    setShiny: PropTypes.func,
    data: PropTypes.array,
}

export default Navbar;