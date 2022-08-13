import React, { useEffect, useState } from "react";
import styles from "./EditNote.module.css";
import { useParams } from "react-router-dom";
import { Box, Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from 'axios'
import { orange } from "@mui/material/colors";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const btnColor = orange[400]
const EditNote = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [data, setData] = useState({
    title: "",
    category: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false)

  const [error, setError] = useState({
    titleError: false,
    categoryError: false,
    descriptionError: false,
  });

  useEffect(()=>{
    axios.get(`http://localhost:3001/note/edit/${id}`).then(res=>{
      console.log('edit details',res.data)
      setData(res.data)
      setIsLoading(true)
    })
  },[])
  
 
  

  
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
      axios.put(`http://localhost:3001/note/update/${id}`,{
        title:data.title,
        category:data.category,
        description:data.description
      }).then(res=>{
       
        setIsLoading(true)
      })
      setData({
        title: "",
        category: "",
        description: "",
      });
      navigate("/");
    }
  };


  if(isLoading){
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
           <h3 className={styles.header_text}>Update Note Details</h3>
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
           <Button type="submit" variant="contained" >
             Update Note
           </Button>
         </Box>
       </div>
     </Container>
     
   );

  }else{
    return (
      
      <h1 style={{marginTop:'90px'}}>
        <Skeleton count={10}  />
        
      </h1>
     
  );
  }
 
};

export default EditNote;
