import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export default function Header() {


  
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Master
          </Typography>
          <Button color="inherit" href="/">SingIn</Button>
          <Button color="inherit" href="/userTable">Usuarios</Button>
          <Button color="inherit" href="/linkTableAdmin">Links Admin</Button>
          <Button color="inherit" href="/linkTable">Links</Button>
          <Button color="inherit" href="/" >Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}