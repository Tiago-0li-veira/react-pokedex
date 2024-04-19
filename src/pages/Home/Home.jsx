import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PokeCard from "./PokeCard";
import Pagination from "./Pagination";
import Navbar from "./Navbar";

function Home(props) {
    const pokePerPage = 20;
    const [page, setPage] = useState(0);
    const [pokeList, setPokeList] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [shiny, setShiny] = useState(false);

   

    useEffect(() => {
      const startIndex = page * pokePerPage;
      const endIndex = startIndex + pokePerPage;
      setPokeList(searchData.slice(startIndex, endIndex));
    }, [page, searchData]);

    useEffect(() => {
        const filteredData = props.data.filter(p => p.name.includes(searchQuery.toLowerCase()));
        setSearchData(filteredData);
        setPage(0);
    }, [searchQuery, props.data]);

    if (props.loading) return (
    <div className="h-screen text-center">Loading...</div>
    );

    return (
        <>
            <Navbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                shiny={shiny}
                setShiny={setShiny}
            />
            <Pagination 
                page={page} 
                setPage={setPage} 
                PpP={pokePerPage} 
                dataLen={searchData.length} 
            />
            <div className="flex justify-center align-middle flex-wrap gap-4">
                {pokeList.map((pokemon, index) =>
                    <PokeCard
                        key={index}
                        pokemon={pokemon}
                        shiny={shiny}
                    />
                )}
            </div>
            {pokeList.length > 10 && <Pagination page={page} setPage={setPage} PpP={pokePerPage} dataLen={searchData.length}/>}
        </>
    );
}

Home.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
}

export default Home;
