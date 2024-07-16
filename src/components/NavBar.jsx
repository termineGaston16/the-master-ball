import { useState } from "react";
import { ButtonNavHome } from "../elements/Buttons";

export default function NavBar() {

    const [subtitle, setSubtitle] = useState("¿Qué deseas hacer?")

    return (<>

        <h3>{subtitle}</h3>

        <nav style={{ display: "flex", gap: "2rem" }}>
            <ButtonNavHome
                to="/mostrar-todos"
                onMouseEnter={() => setSubtitle("Muestra todos los Pokemones de la base de datos.")}
                onMouseLeave={() => setSubtitle("¿Qué deseas hacer?")}
                text="Mostrar Todos" />
            <ButtonNavHome
                to="/buscar-pokemon"
                onMouseEnter={() => setSubtitle("Realiza una busqueda global mediante el nombre o identificador único del Pokémon.")}
                onMouseLeave={() => setSubtitle("¿Qué deseas hacer?")}
                text="Búsqueda Pokémon" />
            <ButtonNavHome
                to="/filtrar-pokemon"
                onMouseEnter={() => setSubtitle("Muestra los Pokemones según sus atributos especiales.")}
                onMouseLeave={() => setSubtitle("¿Qué deseas hacer?")}
                text="Filtrar Pokemones" />
            <ButtonNavHome
                onMouseEnter={() => setSubtitle("Muestra de Pokemones aletorios.")}
                onMouseLeave={() => setSubtitle("¿Qué deseas hacer?")}
                text="Análisis Aleatorio" />
        </nav>
    </>)
}