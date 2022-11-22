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

export default function CreateLinkButton() {
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
      link: data.get('link'),
      descripcion: data.get('descripcion'), 
      tipo: data.get('tipo'),
    }
    axios({
      method: 'post',
      url: 'http://localhost/master-link/adminLinks.php',
      data: dataEnviar
    })
    window.location.reload();
  };

  const [type, setType] = React.useState('');

  const handleChange = (event) => {
    setType(event.target.value);
  };



  return (
    <div style={{margin:"0 0 2% 0"}}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Crear nuevo Link
      </Button>


      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <DialogTitle>{"Creacion de un Nuevo Link"}</DialogTitle>
        <DialogContent >
        
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="link"
                  required
                  fullWidth
                  id="link"
                  label="Link"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="descripcion"
                  label="Descripcion"
                  name="descripcion"
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
          <MenuItem value={1}>Colaboradores</MenuItem>
          <MenuItem value={2}>Jefaturas</MenuItem>
          <MenuItem value={3}>Gerencia</MenuItem>
          <MenuItem value={4}>Administrador</MenuItem>
        </Select>
      </FormControl>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
              </Grid>
            </Grid>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} >Cancelar</Button>
          <Button
                onClick={handleClose}
                type="submit"
            >
              Registrar
            </Button>
        </DialogActions>
        </Box>
      </Dialog>

    </div>
  );
}