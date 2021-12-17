import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';

function AddBook({ addBook }) {
  const [open, setOpen] = useState(false);
  const [book, setBook] = useState({ title: '', author: '', year: '', isbn: '', price: '' })

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const inputChanged = (event) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  }

  const handleSave = () => {
    addBook(book);
    handleClose();
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Add book
      </Button>
      <Dialog open={open}>
        <DialogTitle>New book</DialogTitle>
        <DialogContent>
          <TextField
            name="title"
            value={book.title}
            onChange={inputChanged}
            margin="dense"
            label="Title"
            fullWidth
          />
          <TextField
            name="author"
            value={book.author}
            onChange={inputChanged}
            margin="dense"
            label="Author"
            fullWidth
          />
          <TextField
            name="year"
            value={book.year}
            onChange={inputChanged}
            margin="dense"
            label="Year"
            fullWidth
          />
          <TextField
            name="isbn"
            value={book.isbn}
            onChange={inputChanged}
            margin="dense"
            label="ISBN"
            fullWidth
          />
          <TextField
            name="price"
            value={book.price}
            onChange={inputChanged}
            margin="dense"
            label="Price"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>Cancel</Button>
          <Button color="primary" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddBook;