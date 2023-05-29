import Favoritos from "pages/Favoritos";
import Inicio from "pages/Inicio";
import NaoEncontrada from "pages/NaoEncontrada";
import PaginaBase from "pages/PaginaBase";
import Player from "pages/Player";
import Login from "pages/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastroWho from "pages/CadastroWho";
import CadastroBanda from "pages/CadastroBanda";
import CadastroEspectador from "pages/CadastroEspectador";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                    <Route index element={<Login />}></Route>
                    <Route path="cadastrowho" element={<CadastroWho />}></Route>
                    <Route path="cadastroespectador" element={<CadastroEspectador />}></Route>
                    <Route path="cadastrobanda" element={<CadastroBanda />}></Route>
                    <Route path="/" element={<PaginaBase />}>
                    <Route path="inicio" element={<Inicio />}></Route>
                    <Route path="favoritos" element={<Favoritos />}></Route>
                    <Route path=":id" element={<Player />}></Route>
                    <Route path="*" element={<NaoEncontrada />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;