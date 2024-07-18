import "../css/search.css"
import { useEffect, useState } from "react";
import { useSearch } from "../hooks/useSearch";

export default function Search(props) {

    const { evaluateQuery } = useSearch({ setTypeSearch: props.setTypeSearch });
    const [animation, setAnimation] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        const query = new window.FormData(event.target).get("idLabelInputSearch")
        props.aprobarResultado(evaluateQuery(query))
    }

    useEffect(() => {
        return () => { props.aprobarResultado(null) }
    }, [])

    /* ANIMATION */
    useEffect(() => {
        setAnimation(true)

        return () => {
            setTimeout(() => {
                setAnimation(false)
            }, 1000);
        }
    }, [])

    return (<>
        <h2 className={`form-h3-Search ${animation ? "fade-in" : "fade-out"}`}>Busca Aquí</h2>

        <form className={`form-Search ${animation ? "fade-in" : "fade-out"}`} onSubmit={handleSubmit}>
            <input className="form-input-Search" type="search" name="idLabelInputSearch" placeholder="Pickachu o 2..." />
            <button className="form-button-Search" type="submit">search</button>
        </form>
    </>)
}