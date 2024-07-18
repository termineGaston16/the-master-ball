import "../css/results.css"
import { useLocation } from "react-router-dom";
import Filters from "./Filters"
import { useCallback, useContext, useEffect, useState } from "react";
import useApi from "../js/fetch"
import { ResultsContext } from "../context/results";


export default function Results(props) {

    const location = useLocation();
    const { callToApi, clearAll, increasePage } = useApi();
    const { results, error, loading, pages } = useContext(ResultsContext)
    const [animation, setAnimation] = useState(false)

    /* ANIMATION */
    useEffect(() => {
        setAnimation(true)

        return () => {
            setTimeout(() => {
                setAnimation(false)
            }, 1000);
        }
    }, [])

    /* INFINITY SCROLL */
    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50 && !loading && !error) {
            increasePage();
        }
    }, [])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll)
    }, [handleScroll])

    /* USE-EFFECT PRINCIPAL */
    useEffect(() => {
        /* Mostrar Todos */
        if (location.pathname === "/mostrar-todos") return callToApi(`https://pokeapi.co/api/v2/pokemon?offset=${pages.offset}&limit=${pages.limit}`, "todo")

        /* por ID o nombre */
        if (location.pathname === `/buscar-pokemon/${props.query}`) callToApi("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0", props.typeSearch, props.query)

        /* por Especie */
        if (location.pathname === `/filtrar-pokemon/${props.typePokemon}`) callToApi(`https://pokeapi.co/api/v2/type/${props.typePokemon}`, "especie")

    }, [location, pages])

    /* USE-EFFECT PARA DESMONTAR */
    useEffect(() => {
        return () => { clearAll() }
    }, [])

    /* SI NO SE ENCONTRARON RESULTADOS */
    if (results?.results.length <= 0) return (
        <main className={`main-Results ${animation ? "fade-in" : "fade-out"}`}>
            <h3 className="main-h3-Results">Resultados no encontrados.</h3>
        </main>
    )


    /* SI HAY RESULTADOS */
    if (results) return (<>
        <Filters />

        <main className={`main-Results ${animation ? "fade-in" : "fade-out"}`}>
            <ul className="main-ul-Results">
                {((results.results.map(pokemon => pokemon) || results.results || results) ?? []).map((pokemon, index) => (
                    <li className="main-ul-li-Results" key={index}>{pokemon.name || pokemon.pokemon.name}</li>
                ))}
            </ul>
        </main>

        {results.next && <button className="main-button-Results" onClick={increasePage}>Cargar más Pokemones</button>}
    </>);


    /* CARGANDO */
    if (loading) return (<h3 className="main-h3-Results error">Obteniendo Datos...</h3>)

    /* SI HUBO UN ERROR */
    if (error) return (<h3 className="main-h3-Results error">{error}</h3>)

    /* SI NO HAY NADA */
    if (!results) return null;
}