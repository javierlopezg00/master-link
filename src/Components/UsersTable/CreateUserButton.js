import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateUserButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  //Toma de datos
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataEnviar = {
      nombre: data.get('nombre'),
      apellido: data.get('apellido'),  
      usuario: data.get('usuario'),
      tipo: data.get('tipo'),
    }
    
    axios({
      method: 'post',
      url: 'http://localhost/master-link/adminUsers.php',
      data: dataEnviar
    });

    window.location.reload();
  };

  const [type, setType] = React.useState('');

  const handleChange = (event) => {
    setType(event.target.value);
  };



  return (
    <div style={{margin:"0 0 2% 0"}}>
      <Button variant="outlined" onClick={handleClickOpen} style={{color: "#2f2f2f", borderColor: "#2f2f2f"}}>
        Crear nuevo usuario
      </Button>


      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <DialogTitle>{"Creacion de un Nuevo Usuario"}</DialogTitle>
        <DialogContent >
        
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="nombre"
                  required
                  fullWidth
                  id="nombre"
                  label="Nombre"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="apellido"
                  label="Apellido"
                  name="apellido"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="usuario"
                  label="Usuario"
                  name="usuario"
                  autoComplete="family-name"
                />
              </Grid>

              <FormControl style={{margin:"2.9%"}}           sx={{width: 1.7/4}}>
        <InputLabel id="demo-simple-select-label">Tipo de Usuario</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Tipo de Usuario"
          onChange={handleChange}
          name = "tipo"

        >
                <MenuItem value={"21bf72926eb2d9f1a233c4c679c1eb0f"}>Colaboradores</MenuItem>
                <MenuItem value={"8ee6a9c17d367a41e87865a23134673f"}>Jefaturas</MenuItem>
                <MenuItem value={"b0533f6b23ac1923681bc620eb1caf7c"}>Gerencia</MenuItem>
                <MenuItem value={"f9d4049dd6a4dc35d40e5265954b2a46"}>Administrador</MenuItem>
        </Select>
      </FormControl>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
              </Grid>
            </Grid>
          
        </DialogContent>
        <DialogActions >
          <Button onClick={handleClose} style={{color: "#e10303"}}>Cancelar</Button>
          <Button
                onClick={handleClose}
                type="submit"
                style={{color: "#2f2f2f"}}
            >
              Registrar
            </Button>
        </DialogActions>
        </Box>
      </Dialog>

    </div>
  );
}