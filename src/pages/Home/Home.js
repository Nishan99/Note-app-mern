import React from "react";
import styles from "./Home.module.css";
import { Box, SpeedDialIcon, SpeedDial, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Note from "../Note/Note";
const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container maxWidth="xl">
        <div className={styles.note_container}>
          <Note />
        </div>
        <Box sx={{ height: 320, flexGrow: 1 }}>
          <SpeedDial
            onClick={() => navigate("/add")}
            ariaLabel="Add Note"
            sx={{ position: "absolute", bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
          ></SpeedDial>
        </Box>
      </Container>
    </>
  );
};

export default Home;
