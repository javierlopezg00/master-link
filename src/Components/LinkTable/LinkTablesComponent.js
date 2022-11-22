import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState } from 'react';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'link', label: 'Link', minWidth: 100 },
  {id: 'descripcion',label: 'Descripcion',minWidth: 170,align: 'center',format: (value) => value.toLocaleString('en-US'),},
  {id: 'tipo',label: 'Tipo de usuario',minWidth: 170,align: 'center',format: (value) => value.toFixed(2),},
];


export default function LinkTablesComponent() {
  
//SELECT HANDLE CHANGE
  const [type, setType] = React.useState('');

  const handleChange = (event) => {
    setType(event.target.value);
  };


    //ROWS
  const [rows, setRows]=useState([[]]);
  React.useEffect(() => {
    axios.get("http://localhost/master-link/adminLinks.php")
      .then(response=>{
        
        setRows(response.data);
        
      }).catch(error=>{
        console.log(error);
      });

    }, []);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  const [selectedLink, setselectedLink] = React.useState([]);
  function editLink(id){
    setselectedLink(id);
    handleClickOpen();
  }
  

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteLink = () => {
    axios({
      method: 'DELETE',
      url: 'http://localhost/master-link/adminLinks.php',
      data: {
        id: selectedLink.id
      }
    });
    handleClose();
    window.location.reload();
  }

  //Toma de datos al editar link
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataEnviar = {
      id: selectedLink.id,
      link: data.get('link'),
      descripcion: data.get('descripcion'), 
      tipo: data.get('tipo'),
    }
    console.log(dataEnviar);
    
    axios({
      method: 'put',
      url: 'http://localhost/master-link/adminLinks.php',
      data: dataEnviar
    })
    window.location.reload();
  };
  return (
    <div >
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead>
            <TableRow >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell 
                        onClick={(e) => editLink(row)} key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>


    <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <DialogTitle>{"Edicion del link: "+ selectedLink.id}</DialogTitle>
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
              <FormControl style={{margin:"2.9%"}} sx={{width: 1.7/4}}>
          <InputLabel id="demo-simple-select-label">Tipo de Usuario</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Tipo de Usuario"
                name = "tipo"
                value={type}
                onChange={handleChange}
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
              Editar
            </Button>

            <Button
                onClick={deleteLink}
                type="submit"
            >
              Eliminar
            </Button>
        </DialogActions>
        </Box>
      </Dialog>
              
    </div>
  );
}
