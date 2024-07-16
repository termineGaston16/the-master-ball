import { Link } from "react-router-dom";

export function ButtonNavHome(props) {
    return (<Link to={props.to}><button onMouseLeave={props.onMouseLeave} onMouseEnter={props.onMouseEnter} onClick={props.onClick} className={props.className}>{props.text}</button></Link>)
}
