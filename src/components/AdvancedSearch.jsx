import "../css/advancedSearch.css"
import { useContext, useEffect, useState } from "react"
import useApi from "../js/fetch"
import { ResultsContext } from "../context/results"
import { useNavigate } from "react-router-dom"

export default function AdvancedSearch() {

    const { callToApi } = useApi()
    const { types, setTypes } = useContext(ResultsContext)
    const navigate = useNavigate();
    const [animation, setAnimation] = useState(false)

    useEffect(() => {
        callToApi("https://pokeapi.co/api/v2/type?offset=0&limit=18", "type")

        return () => { setTypes(null) }
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

    const handleCheckboxChange = (event) => {
        navigate(`/filtrar-pokemon/${event.target.value}`)
    };

    if (types) return (<>

        <h2 className={`advancecdSearch-h2-AdvancedSearch ${animation ? "fade-in" : "fade-out"}`}>Búsqueda Avanzada</h2>

        <fieldset className={`advancecdSearch-fieldset-AdvancedSearch ${animation ? "fade-in" : "fade-out"}`}>

            {/* TIPO DE POKÉMON */}
            <ul className="advancecdSearch-ul-AdvancedSearch">
                {(types?.results ?? []).map(type => (
                    <li className={`advancecdSearch-ul-li-AdvancedSearch ${type.name}`} key={type.name}>
                        <label className="advancecdSearch-ul-li-label-AdvancedSearch" htmlFor={type.name}>{type.name}</label>
                        <input
                            className="advancecdSearch-ul-li-input-AdvancedSearch"
                            type="checkbox"
                            name={type.name}
                            id={type.name}
                            value={type.name}
                            hidden
                            onChange={handleCheckboxChange}
                        />
                    </li>
                ))}
            </ul>
        </fieldset>
    </>)

    if (!types) return (<h3 className="advancecdSearch-h3-AdvancedSearch">Cargando Tipos...</h3>)
}
