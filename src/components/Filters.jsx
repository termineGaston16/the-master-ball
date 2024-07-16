import { useResults } from "../hooks/useResults"

export default function Filters() {

    const { filterResults } = useResults();

    const handleChange = (event) => {
        filterResults(event.target.value);
    };

    return (
        <fieldset>
            <legend>Filtrar por:</legend>
            <select onChange={handleChange}>
                <option value="Número Inferior">Número Inferior</option>
                <option value="Número Superior">Número Superior</option>
                <option value="Alfabéticamente">Alfabéticamente</option>
                <option value="Alfabéticamente Inverso">Alfabéticamente Inverso</option>
            </select>
        </fieldset>
    );
}