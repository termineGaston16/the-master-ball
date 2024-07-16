import { Link } from "react-router-dom";

export default function Header() {
    return (<header>
        <div style={{display:"flex", gap:"2rem"}}>
            <span>a proyect by <span>KDA/NOVA</span> ©2024</span>
            <a href="https://pokeapi.co/" target="_blank">API Utilizada</a>
            <a href="https://www.pokemon.com/el/pokedex" target="_blank">Pokédex</a>
        </div>
        <div>
            <Link to={"/"}><h1>The Master Ball</h1></Link>
        </div>
    </header>)
}