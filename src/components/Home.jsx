import { lazy, Suspense, useEffect, useState } from "react";
import NavBar from "../components/NavBar"
import { useParams } from "react-router-dom";
import { useSearch } from "../hooks/useSearch";

const Results = lazy(() => import("./Results"))
const Search = lazy(() => import("./Search"))
const AdvancedSearch = lazy(() => import("./AdvancedSearch"))

const ResultsProvider = lazy(() => import("../context/results").then(module => ({ default: module.ResultsProvider })))

export default function Home() {

    const [errorResults, setErrorResults] = useState(null)
    const { query } = useParams();
    const [urls, setUrls] = useState(["/mostrar-todos", `/buscar-pokemon/${query}]`])
    const [typeSearch, setTypeSearch] = useState(null);
    const { evaluateQuery } = useSearch({ setTypeSearch })

    useEffect(() => {
        setUrls(prevUrls => {
            const newUrls = [...prevUrls];
            newUrls[1] = `/buscar-pokemon/${query}`;
            return newUrls;
        });

        if (query) setErrorResults(evaluateQuery(query))

    }, [query]);

    return (<main>

        {(location.pathname === "/") ?
            <NavBar />
            : null}


        {(urls.some(url => url === location.pathname)) ?
            <Suspense fallback={"Obteniendo Resultados..."}>
                {(errorResults) ? <span>{errorResults}</span> : <ResultsProvider><Results typeSearch={typeSearch} query={query} /></ResultsProvider>}
            </Suspense>
            : null}

        {(location.pathname === "/buscar-pokemon") ?
            <Suspense>
                <Search setTypeSearch={setTypeSearch} aprobarResultado={setErrorResults} />
            </Suspense>
            : null}

        {errorResults && <span>{errorResults}</span>}

        {(location.pathname === "/filtrar-pokemon") ?
            <Suspense fallback="Cargando Tipos...">
                <ResultsProvider><AdvancedSearch /></ResultsProvider>
            </Suspense>
            : null}

    </main>)
}