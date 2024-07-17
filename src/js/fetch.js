import { useContext } from "react";
import { ResultsContext } from "../context/results";

export default function useApi() {
    const { pages, setResults, setError, setLoading, setController, setPages, setTypes } = useContext(ResultsContext);

    /* FETCH IN THE DATOS */
    const callToApi = (url, tipoDeFetch, query) => {
        const abortController = new AbortController();
        setController(abortController);

        setLoading(true);

        fetch(url, { signal: abortController.signal }, tipoDeFetch)
            .then(response => {
                if (!response.ok) {
                    setError("Ocurrió un error inesperado.\n Por favor, vuélvelo a intentar.");
                    throw new Error("¡Error al llamar a la API!");
                }
                return response.json();
            })
            .then(json => {
                setError(null);

                // BUSQUEDA DE TODOS LOS POKEMONES
                if (tipoDeFetch === "todo") {
                    setResults(prevResults => {
                        if (prevResults) {
                            // Concatenate new results with previous results
                            return {
                                ...json,
                                results: [...prevResults.results, ...json.results]
                            };
                        }
                        return json;
                    });
                }

                // BUSQUEDA POR ID
                if (tipoDeFetch === "ID") {
                    setResults(prevResults => {
                        // Crear un nuevo objeto para almacenar los resultados
                        const newObject = { ...prevResults };

                        // Filtrar los resultados que contienen el identificador en el URL
                        const allResults = json.results?.filter(pokemon => {
                            const urlSegments = pokemon.url.split('/');
                            const penultimateSegment = urlSegments[urlSegments.length - 2];
                            return penultimateSegment.includes(query);
                        });

                        // Manejar la primera carga y las cargas subsiguientes
                        if (prevResults && prevResults.results.length > 0) {
                            // Añadir más resultados a los existentes
                            newObject.results = [...prevResults.results, ...allResults.slice(pages.offset, pages.offset + pages.limit)];
                        } else {
                            // Primera carga: tomar los primeros 10 resultados
                            newObject.results = allResults.slice(0, 10);
                        }

                        // Establecer el valor de next según si hay más resultados disponibles
                        newObject.next = allResults.length > (prevResults?.results.length || 0) + 10;

                        return newObject;
                    });
                }

                // BUSQUEDA POR NOMBRE
                if (tipoDeFetch === "nombre") {
                    setResults(prevResults => {
                        // Crear un nuevo objeto para almacenar los resultados
                        const newObject = { ...prevResults };

                        // Filtrar los resultados que contienen el identificador en el URL
                        const allResults = json.results?.filter(pokemon => pokemon.name.includes(query.toLowerCase()));

                        // Manejar la primera carga y las cargas subsiguientes
                        if (prevResults && prevResults.results.length > 0) {
                            // Añadir más resultados a los existentes
                            newObject.results = [...prevResults.results, ...allResults.slice(pages.offset, pages.offset + pages.limit)];
                        } else {
                            // Primera carga: tomar los primeros 10 resultados
                            newObject.results = allResults.slice(0, 10);
                        }

                        // Establecer el valor de next según si hay más resultados disponibles
                        newObject.next = allResults.length > (prevResults?.results.length || 0) + 10;

                        return newObject;
                    });
                }

                // OBTENER LOS TIPOS
                if (tipoDeFetch === "type") {
                    setTypes(json)
                }

                // FILTRAR POR ESPECIE
                if (tipoDeFetch === "especie") {
                    setResults(prevResults => {
                        // Crear un nuevo objeto para almacenar los resultados
                        const newObject = { ...prevResults };

                        // Filtrar los resultados que contienen el identificador en el URL
                        const allPokemons = json.pokemon
                        
                        // Manejar la primera carga y las cargas subsiguientes
                        if (prevResults && prevResults.results.length > 0) {

                            // Añadir más resultados a los existentes
                            newObject.results = [...prevResults.results, ...allPokemons.slice(pages.offset, pages.offset + pages.limit)];
                        } else {
                            // Primera carga: tomar los primeros 10 resultados
                            newObject.results = allPokemons.slice(0, 10);
                        }

                        // Establecer el valor de next según si hay más resultados disponibles
                        newObject.next = allPokemons.length > (prevResults?.results.length || 0) + 10;

                        return newObject;
                    });
                }

            })
            .catch(error => {
                if (error.name === "AbortError") {
                    setError("Llamada cancelada por el usuario.");
                } else {
                    setError("Ocurrió un error inesperado.\n Por favor, vuélvelo a intentar.");
                    console.error(error);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    /* CANCELAR LLAMADA */
    const abortCall = (controller) => {
        if (controller) {
            controller.abort();
            setLoading(false);
        }
    };

    /* LIMPIAR TODO */
    const clearAll = () => {
        setResults(null), setError(null), setLoading(false), setController(null), setPages({ offset: 0, limit: 10 })
    }

    /* CARGAR MÁS POKEMONES */
    const increasePage = () => {
        setPages(prevPage => ({
            ...prevPage,
            offset: prevPage.offset + 10
        }));
    }


    return { callToApi, abortCall, clearAll, increasePage };
}
