import React from 'react'
import { Routes, Route } from "react-router-dom";
import SignIn from '../Pages/SignIn';
import LinkTables from '../Pages/LinkTables';
import LinkTablesAdmin from '../Pages/LinkTablesAdmin';
import UserTables from '../Pages/UserTables';
import { useState } from 'react';



export default function AppRouter() {

    const user_type = 4;

    return (
        <div className="App">
            <Routes>
                    {user_type==4 ? 
                    <>
                        <Route path="/" element={<SignIn/>} />
                        <Route path="/linkTable" element={<LinkTables/>} />
                        <Route path="/userTable" element={<UserTables/>} />
                        <Route path="/linkTableAdmin" element={<LinkTablesAdmin/>} />
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