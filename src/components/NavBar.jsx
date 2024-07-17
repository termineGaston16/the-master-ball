import "../css/navbar.css"
import { useState } from "react";
import { ButtonNavHome } from "../elements/Buttons";

export default function NavBar() {
    const [subtitle, setSubtitle] = useState("¿Qué deseas hacer?");
    const [opacity, setOpacity] = useState(1);

    const handleMouseEnter = (newSubtitle) => {
        setOpacity(0);
        setTimeout(() => {
            setSubtitle(newSubtitle);
            setOpacity(1);
        }, 150); // Tiempo de la transición en milisegundos
    };

    const handleMouseLeave = () => {
        setOpacity(0);
        setTimeout(() => {
            setSubtitle("¿Qué deseas hacer?");
            setOpacity(1);
        }, 150); // Tiempo de la transición en milisegundos
    };

    return (
        <>
            <h3 className="h3-NavBar" style={{ transition: "opacity 0.3s", opacity }}>{subtitle}</h3>
            <nav className="nav-NavBar" style={{ display: "flex", gap: "2rem" }}>
                <ButtonNavHome
                    to="/mostrar-todos"
                    onMouseEnter={() => handleMouseEnter("Muestra todos los Pokemones de la base de datos.")}
                    onMouseLeave={handleMouseLeave}
                    text="Mostrar Todos"
                    className="button-link-buttonNavHome"
                />
                <ButtonNavHome
                    to="/buscar-pokemon"
                    onMouseEnter={() => handleMouseEnter("Realiza una búsqueda global mediante el nombre o identificador único del Pokémon.")}
                    onMouseLeave={handleMouseLeave}
                    text="Búsqueda Pokémon"
                    className="button-link-buttonNavHome"
                />
                <ButtonNavHome
                    to="/filtrar-pokemon"
                    onMouseEnter={() => handleMouseEnter("Muestra los Pokemones según sus atributos especiales.")}
                    onMouseLeave={handleMouseLeave}
                    text="Filtrar Pokemones"
                    className="button-link-buttonNavHome"
                />
            </nav>
        </>
    );
}
