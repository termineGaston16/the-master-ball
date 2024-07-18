import "../css/home.css"
import { lazy, Suspense, useEffect, useState } from "react";
import NavBar from "../components/NavBar"
import { useParams } from "react-router-dom";
import { useSearch } from "../hooks/useSearch";
import ScrollToTopButton from "./ScrollToTopButton"

const Results = lazy(() => import("./Results"))
const Search = lazy(() => import("./Search"))
const AdvancedSearch = lazy(() => import("./AdvancedSearch"))

const ResultsProvider = lazy(() => import("../context/results").then(module => ({ default: module.ResultsProvider })))

export default function Home() {

    const [errorResults, setErrorResults] = useState(null)
    const { query, typePokemon } = useParams();
    const [urls, setUrls] = useState(["/mostrar-todos", `/buscar-pokemon/${query}`, `/filtrar-pokemon/${typePokemon}`])
    const [typeSearch, setTypeSearch] = useState(null);
    const { evaluateQuery } = useSearch({ setTypeSearch })
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

    useEffect(() => {
        setUrls(prevUrls => {
            const newUrls = [...prevUrls];
            newUrls[1] = `/buscar-pokemon/${query}`;
            newUrls[2] = `/filtrar-pokemon/${typePokemon}`;
            return newUrls;
        });

        if (query) setErrorResults(evaluateQuery(query))

    }, [query, typePokemon]);

    return (<main className={`home-Home ${animation ? "fade-in" : "fade-out"}`}>

        {(location.pathname === "/") ?
            <NavBar />
            : null}


        {(location.pathname === "/buscar-pokemon" || location.pathname === `/buscar-pokemon/${query}`) ?
            <Suspense>
                <Search setTypeSearch={setTypeSearch} aprobarResultado={setErrorResults} />
            </Suspense>
            : null}


        {(location.pathname === "/filtrar-pokemon" || location.pathname === `/filtrar-pokemon/${typePokemon}`) ?
            <Suspense fallback={<span className="main-h3-Results">Cargando Tipos...</span>}>
                <ResultsProvider><AdvancedSearch /></ResultsProvider>
            </Suspense>
            : null}


        {(urls.some(url => url === location.pathname)) ?
            <Suspense fallback={<span className="main-h3-Results">Obteniendo Resultados...</span>}>
                {(errorResults) ? <span className="span-error-Home">{errorResults}</span> : <ResultsProvider><Results typeSearch={typeSearch} query={query} typePokemon={typePokemon} /></ResultsProvider>}
            </Suspense>
            : null}

        <ScrollToTopButton />
    </main>)
}