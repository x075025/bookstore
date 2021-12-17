import { Delete } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import React, { useEffect, useState } from 'react';
import './App.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AddBook from './AddBook';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchItems();
  }, [])

  const fetchItems = () => {
    fetch('https://todolist-e9f5e-default-rtdb.firebaseio.com/books/.json')
      .then(response => response.json())
      .then(data => addKeys(data))
      .catch(err => console.error(err))
  }

  const deleteBook = (id) => {
    console.log(id)
    fetch(`https://todolist-e9f5e-default-rtdb.firebaseio.com/books/${id}.json`,
      {
        method: 'DELETE',
      })
      .then(response => fetchItems())
      .catch(err => console.error(err))
  }

  // Add keys to the todo objects
  const addKeys = (data) => {
    const keys = Object.keys(data);
    const valueKeys = Object.values(data).map((item, index) =>
      Object.defineProperty(item, 'id', { value: keys[index] }));
    setBooks(valueKeys);
  }

  const addBook = (newBook) => {
    fetch('https://todolist-e9f5e-default-rtdb.firebaseio.com/books/.json',
      {
        method: 'POST',
        body: JSON.stringify(newBook)
      })
      .then(response => fetchItems())
      .catch(err => console.error(err))
  }


  return (
    <div className="App">
      <AppBar position="static" color='primary' style={{ marginBottom: 20 }}>
        <Toolbar>
          <Typography variant="h6">
            Bookstore
          </Typography>
        </Toolbar>
      </AppBar>

      <AddBook addBook={addBook} />

      <div className="ag-theme-material" style={{ height: 400, width: '80%', margin: 'auto' }}>
        <AgGridReact rowData={books} animateRows={true}>
          <AgGridColumn sortable={true} filter={true} field='title' />
          <AgGridColumn sortable={true} filter={true} field='author' />
          <AgGridColumn sortable={true} filter={true} field='year' />
          <AgGridColumn sortable={true} filter={true} field='isbn' />
          <AgGridColumn sortable={true} filter={true} field='price' />
          <AgGridColumn
            headerName=''
            field='id'
            width={90}
            cellRendererFramework={params =>
              <IconButton onClick={() => deleteBook(params.value)} size="small" color="secondary">
                <Delete />
              </IconButton>
            }
          />
        </AgGridReact>
      </div>
    </div>
  );
}

export default App;