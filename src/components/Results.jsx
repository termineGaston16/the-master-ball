import { useLocation, useParams } from "react-router-dom";
import Filters from "./Filters"
import { useCallback, useContext, useEffect } from "react";
import useApi from "../js/fetch"
import { ResultsContext } from "../context/results";


export default function Results(props) {

    const location = useLocation();
    const { callToApi, clearAll, increasePage } = useApi();
    const { results, error, loading, pages } = useContext(ResultsContext)

    /* INFINITY SCROLL */
    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50 && !loading) {
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

    }, [location, pages])

    /* USE-EFFECT PARA DESMONTAR */
    useEffect(() => {
        return () => { clearAll() }
    }, [])


    /* SI NO SE ENCONTRARON RESULTADOS */
    if (results?.results.length <= 0) return (
        <main style={{ width: "100%" }}>
            <h3>Resultados no encontrados.</h3>
        </main>
    )

    /* SI HAY RESULTADOS */
    if (results) return (
        <main style={{ width: "100%" }}>
            <Filters />

            <ul style={{ margin: 0, padding: 0, display: "grid", gap: "2rem", maxWidth: "1200px", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 250px))" }}>
                {((results.results || results) ?? []).map((pokemon, index) => (
                    <li style={{ border: "1px solid red" }} key={index}>{pokemon.name}</li>
                ))}
            </ul>

            {results.next && <button onClick={increasePage}>Cargar más Pokemones</button>}
        </main>
    );


    /* CARGANDO */
    if (loading) return (<h3>Obteniendo Datos...</h3>)

    /* SI HUBO UN ERROR */
    if (error) return (<h3>{error}</h3>)

    /* SI NO HAY NADA */
    if (!results) return null;
}