import React from 'react'
import { Routes, Route } from "react-router-dom";
import SignIn from '../Pages/SignIn';
import LinkTables from '../Pages/LinkTables';
import LinkTablesAdmin from '../Pages/LinkTablesAdmin';
import UserTables from '../Pages/UserTables';



export default function AppRouter() {

    const user_type = localStorage.getItem('userType');

    const userTypesH = {
        colaboradores:  "21bf72926eb2d9f1a233c4c679c1eb0f",
        jefaturas:      "8ee6a9c17d367a41e87865a23134673f",
        gerencia:      "b0533f6b23ac1923681bc620eb1caf7c",
        administrador:  "f9d4049dd6a4dc35d40e5265954b2a46"
    }

    return (
        <div className="App">
            <Routes>
                    {user_type===userTypesH.administrador ? 
                    <>
                        <Route path="/linkTable" element={<LinkTables/>} />
                        <Route path="/userTable" element={<UserTables/>} />
                        <Route path="/linkTableAdmin" element={<LinkTablesAdmin/>} />
                        <Route path="*" element={<h1>404 Not Found</h1>} />
                    </>:  user_type===userTypesH.gerencia || user_type===userTypesH.jefaturas || user_type===userTypesH.colaboradores ?
                    <> 
                        <Route path="/linkTable" element={<LinkTables/>} />
                        <Route path="*" element={<h1>404 Not Found</h1>} />
                    </> :
                    <> 
                    <Route path="/" element={<SignIn/>} />
                    <Route path="*" element={<h1>404 Not Found</h1>} />
                </> 

} 
            </Routes>
        </div>
    )
}