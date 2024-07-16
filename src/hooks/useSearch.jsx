import { useNavigate } from "react-router-dom";

export function useSearch({ setTypeSearch }) {

    const navigation = useNavigate()

    // EVALUAR QUERY
    const evaluateQuery = (query) => {
        setTypeSearch(null)

        // Si se ingresa algo vacío o con espacios se rechaza
        if (query.trim() === "") return "¡Ingresa una letra o número para empezar a buscar!";


        // Si se ingresa números buscará por identificador único.
        if (/^\d+$/.test(query)) {
            navigation(`/buscar-pokemon/${query.toLowerCase()}`)
            setTypeSearch("ID")
            return null;
        }

        // Si se ingresa una letra buscará por nombre
        if (/^[a-z]+$/.test(query.toLowerCase())) {
            navigation(`/buscar-pokemon/${query.toLowerCase()}`)
            setTypeSearch("nombre")
            return null;
        }

        // El resto lo descartará.
        return "Busqueda no encontrada. ";

    }

    return { evaluateQuery }
}