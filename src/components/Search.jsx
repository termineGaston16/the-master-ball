import { useEffect } from "react";
import { useSearch } from "../hooks/useSearch";

export default function Search(props) {

    const { evaluateQuery } = useSearch({ setTypeSearch: props.setTypeSearch });

    const handleSubmit = (event) => {
        event.preventDefault();
        const query = new window.FormData(event.target).get("idLabelInputSearch")
        props.aprobarResultado(evaluateQuery(query))
    }

    useEffect(() => {
        return () => { props.aprobarResultado(null) }
    }, [])

    return (<form onSubmit={handleSubmit}>
        <h3>Busca Aquí</h3>
        <input type="search" name="idLabelInputSearch" placeholder="Pickachu o 1..." />
        <button type="submit">search</button>
    </form>)
}