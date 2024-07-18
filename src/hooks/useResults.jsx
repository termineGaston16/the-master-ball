import { useContext } from "react";
import { ResultsContext } from "../context/results";

export function useResults() {
    const { results, setResults } = useContext(ResultsContext);

    // Función para extraer el anteúltimo número de la URL
    const extractNumberFromURL = (url) => {
        const parts = url.split('/');
        const number = parseInt(parts[parts.length - 2], 10); // Anteúltimo dato convertido a número
        return isNaN(number) ? 0 : number; // Devuelve 0 si no es un número
    };

    // FILTRAR RESULTADOS
    const filterResults = (filter) => {
        const newList = [...results.results].sort((a, b) => {
            switch (filter) {
                case "Número Inferior":
                    return extractNumberFromURL(a.url) - extractNumberFromURL(b.url);

                case "Número Superior":
                    return extractNumberFromURL(b.url) - extractNumberFromURL(a.url);

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
