import { useContext } from "react"
import { ResultsContext } from "../context/results"

export function useResults() {
    const { results, setResults } = useContext(ResultsContext);

    // FILTRAR RESULTADOS
    const filterResults = (filter) => {
        const newList = [...results.results].sort((a, b) => {
            switch (filter) {
                case "Número Inferior":
                    return a.url.localeCompare(b.url);

                case "Número Superior":
                    return b.url.localeCompare(a.url);

                case "Alfabéticamente":
                    return a.name.localeCompare(b.name);

                case "Alfabéticamente Inverso":
                    return b.name.localeCompare(a.name);

                default:
                    return 0; // No ordenar si el filtro no coincide
            }
        });

        return setResults({ ...results, results: newList });
    }

    return { filterResults };
}
