import "../css/filters.css"
import { useResults } from "../hooks/useResults"

export default function Filters() {

    const { filterResults } = useResults();

    const handleChange = (event) => {
        filterResults(event.target.value);
    };

    return (
        <fieldset className="fieldset-Filters">
            <legend className="fieldset-legend-Filters">Filtrar por:</legend>
            <select className="fieldset-select-Filters" onChange={handleChange}>
                <option className="fieldset-select-option-Filters" value="Número Inferior">Número Inferior</option>
                <option className="fieldset-select-option-Filters" value="Número Superior">Número Superior</option>
                <option className="fieldset-select-option-Filters" value="Alfabéticamente">Alfabéticamente</option>
                <option className="fieldset-select-option-Filters" value="Alfabéticamente Inverso">Alfabéticamente Inverso</option>
            </select>
        </fieldset>
    );
}