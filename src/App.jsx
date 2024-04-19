import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home/Home";
import PokemonDetails from "./pages/PokemonDetails/PokemonDetail";
import "/src/index.css"

function App(){

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchPokemon();
      }, []);
  
    const fetchPokemon = async () => {
        try {
            setLoading(true);
            const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1302");
            const urlArray = response.data.results.map(p => p.url);
            const promises = urlArray.map(url => axios.get(url));
            const responses = await Promise.all(promises);
            const allData = responses.map(res => res.data);
            setData(allData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    return(
        <div className="min-h-screen">
        <Routes>
            <Route path="/" element={<Home data={data} loading={loading}/>}/>
            <Route path="/PokemonDetails/:id" element={<PokemonDetails/>}/>
        </Routes>
        </div>
    )
}

export default App;