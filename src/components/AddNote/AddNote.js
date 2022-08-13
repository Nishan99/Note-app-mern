import {
  Container,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import styles from "./AddNote.module.css";
import { useNavigate,useLocation } from "react-router-dom";
import axios from 'axios'

const AddNote = () => {
  const location = useLocation()

  console.log( location.pathname)
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    category: "",
    description: "",
  });

  const [error, setError] = useState({
    titleError: false,
    categoryError: false,
    descriptionError: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({
      titleError: false,
      categoryError: false,
      descriptionError: false,
    });
    if (data.title === "") {
      setError({ ...error, titleError: true });
    } else if (data.category === "") {
      setError({ ...error, categoryError: true });
    } else if (data.description === "") {
      setError({ ...error, descriptionError: true });
    } else {
      axios.post('http://localhost:3001/note',data).then(res=>{
        alert(res.data)
      })
      setData({
        title: "",
        category: "",
        description: "",
      });
      navigate("/");
    }
  };
  return (
    <Container maxWidth="lg">
      <div className={styles.form_container}>
        <Box
          variant="outlined"
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <h3 className={styles.header_text}>Add Note Details</h3>
          <div className={styles.input_group}>
            <TextField
              error={error.titleError}
              margin="normal"
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Note Title"
              name="title"
              placeholder="Enter Note Title"
              autoFocus
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>

          <div className={styles.input_group}>
            <FormControl fullWidth>
              <InputLabel id="select-caterory"> Category</InputLabel>
              <Select
                error={error.categoryError}
                labelId="select-caterory"
                id="demo-simple-select"
                // value={age}
                value={data.category}
                onChange={(e) => setData({ ...data, category: e.target.value })}
                label="Category"

                // onChange={handleChange}
              >
                <MenuItem value="todo">To Do</MenuItem>
                <MenuItem value="work">Work</MenuItem>
                <MenuItem value="personal">Personal</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={styles.input_group}>
            <TextField
              error={error.descriptionError}
              margin="normal"
              variant="outlined"
              required
              fullWidth
              name="description"
              autoFocus
              label="Note Description"
              placeholder="Add Your Description Here..."
              multiline
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </div>
          <Button type="submit" variant="contained">
            Add Note
          </Button>
        </Box>
      </div>
    </Container>
  );
};

export default AddNote;
