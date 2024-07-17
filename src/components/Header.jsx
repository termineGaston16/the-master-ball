import "../css/header.css"
import { Link } from "react-router-dom";
import logoPrincipal from "../img/logoPrincipal.png"


export default function Header() {
    return (<header className="header-Header">
        <div className="header-div1-Header" style={{ display: "flex", gap: "2rem" }}>
            <a className="header-div1-link-Header" href="https://pokeapi.co/" target="_blank">API Utilizada</a>
            <span className="header-div1-span-Header">a proyect by <span className="span-copyright">KDA/NOVA</span> ©2024</span>
            <a className="header-div1-link-Header" href="https://www.pokemon.com/el/pokedex" target="_blank">Pokédex</a>
        </div>
        <div className="header-div2-Header">
            <Link className="header-div2-link-Header" to={"/"}>
                <img className="header-div2-link-img-Header" src={logoPrincipal} alt="logo principal de la pagina de The Master Ball" />
            </Link>
        </div>
    </header>)
}