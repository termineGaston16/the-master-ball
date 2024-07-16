import { useContext, useEffect } from "react"
import useApi from "../js/fetch"
import { ResultsContext } from "../context/results"

export default function AdvancedSearch() {

    const { callToApi } = useApi()
    const { types, setTypes } = useContext(ResultsContext)

    useEffect(() => {
        callToApi("https://pokeapi.co/api/v2/type?offset=0&limit=1000", "especie")

        return () => { setTypes(null) }
    }, [])

    const handleCheckboxChange = (event) => {
        const typeName = event.target.value;
        alert(`Type selected: ${typeName}`);
    };

    if (types) return (
        <fieldset>
            <h2>Búsqueda Avanzada</h2>

            {/* TIPO DE POKÉMON */}
            <ul>
                {types.results.map(type => (
                    <li key={type.name}>
                        <label htmlFor={type.name}>{type.name}</label>
                        <input
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
    )

    if (!types) return ("Cargando Tipos...")
}
