import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";

const Header = lazy(() => import("./components/Header"));
const Home = lazy(() => import("./components/Home"));

function RouteNormalizer() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname !== '/' && location.pathname.endsWith('/')) {
            navigate(location.pathname.slice(0, -1), { replace: true });
        }
    }, [location, navigate]);

    return null;
}

export default function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<span style={{
                color: "withe",
                fontSize: "1.3rem",
                fontFamily: "Trebuchet MS",
                fontWeight: "600",
                fontStyle: "italic",
                textShadow: "0px 0px 0.3rem white",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',

            }}>Cargando App</span>}>

                <Header />
                <RouteNormalizer />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="*" element={"Pagina no encontrada :("} />

                    <Route exact path="/mostrar-todos" element={<Home />} />
                    <Route exact path="/buscar-pokemon" element={<Home />} />
                    <Route exact path="/buscar-pokemon/:query" element={<Home />} />
                    <Route exact path="/filtrar-pokemon" element={<Home />} />
                    <Route exact path="/filtrar-pokemon/:typePokemon" element={<Home />} />

                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
