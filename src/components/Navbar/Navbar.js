import {
  Box,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Divider,
  DrawerHeader,
  ListItemText,
  Button,
  List,
  ListItem,
  Drawer,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
// import {MenuIcon} from '@mui/icons-material'
import MenuIcon from "@mui/icons-material/Menu";
import NoteIcon from "@mui/icons-material/Note";
import React, { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [openSideBar, setOpenSideBar] = useState(false);

  const toggleSideBar = () => {
    setOpenSideBar(!openSideBar);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleSideBar}
      onKeyDown={toggleSideBar}
    >
      <List>
        <ListItem key='View Note' disablePadding style={{ margin: "10px 0" }} onClick={() => navigate("/")}>
          <ListItemButton>
            <ListItemIcon>
              <NoteIcon  />
            </ListItemIcon>
            <ListItemText primary='View Note' />
          </ListItemButton>
        </ListItem>
        <ListItem key="Add Note" disablePadding style={{ margin: "10px 0" }} onClick={() => navigate("/add")}>
          <ListItemButton>
            <ListItemIcon>
              <NoteAddIcon  />
            </ListItemIcon>
            <ListItemText primary='Add Note' />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleSideBar}
          >
            <MenuIcon />
          </IconButton>

          <Drawer open={openSideBar} onClose={toggleSideBar}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "10px 20px",
              }}
            >
              <IconButton onClick={toggleSideBar}>
                <ChevronLeftIcon />
              </IconButton>
            </div>

            <Divider />

            {list()}
          </Drawer>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
              Notes App
            </Link>
          </Typography>
          <Button onClick={() => navigate("/add")} color="inherit">
            Add Note
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
