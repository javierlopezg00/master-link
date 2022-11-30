import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useState } from 'react';  

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'link', label: 'Link', minWidth: 100 },
  {id: 'descripcion',label: 'Descripcion',minWidth: 170,align: 'center',format: (value) => value.toLocaleString('en-US'),},
  {id: 'tipo',label: 'Tipo de usuario',minWidth: 170,align: 'center',format: (value) => value.toFixed(2),},
];


export default function LinkTableViewComponent() {

  const userTypesH = {
    colaboradores:  "21bf72926eb2d9f1a233c4c679c1eb0f",
    jefaturas:      "8ee6a9c17d367a41e87865a23134673f",
    gerencia:      "b0533f6b23ac1923681bc620eb1caf7c",
    administrador:  "f9d4049dd6a4dc35d40e5265954b2a46"
}

  const userType = localStorage.getItem('userType');



    //ROWS
  const [rows, setRows]=useState([[]]);
  React.useEffect(() => {
    axios.get("http://localhost/master-link/viewLinks.php", {params: {tipoLink: userType}})
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

  
  
  

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
                  <TableRow  role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell 
                         key={column.id} align={column.align}>
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


    
              
    </div>
  );
}
