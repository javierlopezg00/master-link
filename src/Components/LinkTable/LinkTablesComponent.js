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
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid} from '@mui/material';

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'link', label: 'Link', minWidth: 100 },
  {id: 'descripcion',label: 'Descripcion',minWidth: 170,align: 'center',format: (value) => value.toLocaleString('en-US'),},
  {id: 'tipo',label: 'Tipo de usuario',minWidth: 170,align: 'center',format: (value) => value.toFixed(2),},
];


export default function LinkTablesComponent() {
  
  const userTypesH = {
    colaboradores:  "21bf72926eb2d9f1a233c4c679c1eb0f",
    jefaturas:      "8ee6a9c17d367a41e87865a23134673f",
    gerencia:      "b0533f6b23ac1923681bc620eb1caf7c",
    administrador:  "f9d4049dd6a4dc35d40e5265954b2a46"
}
  
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

        response.data.forEach(element => {
          if(element.tipo === userTypesH.colaboradores){
            element.tipo = "Colaboradores";
          }else if (element.tipo === userTypesH.administrador){
            element.tipo = "Administrador";
          }else if (element.tipo === userTypesH.jefaturas){
            element.tipo ="Jefaturas";
          }else if (element.tipo === userTypesH.gerencia){
            element.tipo = "Gerencia";
          }
        });
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
              <label>Link:    </label>
                <input type="text"
                  autoComplete="given-name"
                  name="link"
                  required
                  class="editInput"
                  label="Link"
                  autoFocus
                  defaultValue={selectedLink.link}
                />
                <br/>
              <label>Descripcion: </label>
                <input type="text"
                  required
                  class="editInput"
                  label="Descripcion"
                  name="descripcion"
                  autoComplete="family-name"
                  defaultValue={selectedLink.descripcion}
                />
              <FormControl sx={{width: 4/4}}>
          <label >Tipo de Usuario:</label>
              <select
                labelId="demo-simple-select-label"
                class="editInput"
                label="Tipo de Usuario"
                name = "tipo"
                defaultValue={selectedLink.tipo}
                onChange={handleChange}
                >
                <option value={"21bf72926eb2d9f1a233c4c679c1eb0f"}>Colaboradores</option>
                <option value={"8ee6a9c17d367a41e87865a23134673f"}>Jefaturas</option>
                <option value={"b0533f6b23ac1923681bc620eb1caf7c"}>Gerencia</option>
                <option value={"f9d4049dd6a4dc35d40e5265954b2a46"}>Administrador</option>
              </select>
      </FormControl>
                </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
              </Grid>
            </Grid>

            
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{color:'black'}}>Cancelar</Button>
          <Button
                onClick={handleClose}
                type="submit"
                style={{color:'black'}}
            >
              Editar
            </Button>

            <Button
                onClick={deleteLink}
                type="submit"
                style={{color:'red'}}
            >
              Eliminar
            </Button>
        </DialogActions>
        </Box>
      </Dialog>
              
    </div>
  );
}
