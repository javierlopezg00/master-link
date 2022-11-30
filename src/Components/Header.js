import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import LogoGrupoMaster from './grupo-master-logo.png';


export default function Header() {

  const userTypesH = {
        colaboradores:  "21bf72926eb2d9f1a233c4c679c1eb0f",
        jefaturas:      "8ee6a9c17d367a41e87865a23134673f",
        gerencia:      "b0533f6b23ac1923681bc620eb1caf7c",
        administrador:  "f9d4049dd6a4dc35d40e5265954b2a46"
    }

  const userType = localStorage.getItem('userType');

  const logout = () =>{
    localStorage.clear();
  }
  
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{"background-color":"#2f2f2f"}}>

          <img src={LogoGrupoMaster} style={{"width": "15%"}}></img>
          {
            userType===userTypesH.administrador?
          <>
          <Button color="inherit" href="/userTable">Usuarios</Button>
          <Button color="inherit" href="/linkTableAdmin">Links Admin</Button>
          <Button color="inherit" href="/linkTable">Links</Button>
          <Button color="inherit" href="/"  onClick={logout} ><LogoutIcon/></Button>
          </>: userType===userTypesH.jefaturas || userType===userTypesH.gerencia || userType===userTypesH.colaboradores?
          <>
          <Button color="inherit" href="/"  onClick={logout}><LogoutIcon/></Button>
          </>:
          <></>
          }

        </Toolbar>
      </AppBar>
    </Box>
  );
}