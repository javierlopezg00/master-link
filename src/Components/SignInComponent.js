import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const theme = createTheme();

export default function SignInComponent() {
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [errorText, setErrorText] = useState(false);
  const [idNewPassword, setIdNewPassword] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);    
    let dataEnviar = new FormData();
    dataEnviar.append('usuario', data.get('usuario'));
    dataEnviar.append('password', data.get('password'));


    axios.post('http://localhost/master-link/signIn.php', dataEnviar)
    .then(function (response) {

      if(response.data.password == "usuario123"){
        setIdNewPassword(response.data.id);
        handleClickOpen();
      }else{
      setErrorText(false);
      localStorage.setItem("userType", response.data.tipo);
      window.location.replace('linkTable');
      }
      
  })
  .catch(function (response) {
    setErrorText(true);
  });


  };

  const handleSubmit2 = (event) =>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);    

    
    const newPasswordInfo = {
      id: idNewPassword,
      newPassword: data.get("newPassword")
    }

    console.log(newPasswordInfo);
    
    axios({
      method: 'put',
      url: 'http://localhost/master-link/newPassword.php',
      data: newPasswordInfo
    });
    handleClose();
    
  }
  return (
    <div>
      
        <Dialog open={open} onClose={handleClose}>
        <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 1 }}>
              <DialogTitle>Ingrese su nueva contraseña</DialogTitle>
              <DialogContent>
              <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
              </DialogContent>
              <DialogActions>
              <Button type="submit">Guardar</Button>
              </DialogActions>
                
                </Box>
            </Dialog>
      

      <ThemeProvider theme={theme}>



      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" style={{"color": "#2f2f2f"}}>
            Registro
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="usuario"
              label="Usuario"
              name="usuario"
              autoComplete="usuario"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {
              errorText === true?
              <p style={{"color": "#e10303","margin":"0"}}>Usuario y/o contraseña incorrecta</p>:
              <></>
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{"background-color":"#2f2f2f","margin-top":"2%"}}
            >
              Ingresar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    
    </div>
    
  );
}