import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";

import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState, useEffect } from "react";
import "./Note.module.css";
import Masonry from "react-masonry-css";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Note = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:3001/note").then((res) => {
      setData(res.data);

      setIsLoading(true);
    });
  }, []);

  const deleteNote = (id) => {
    axios.delete(`http://localhost:3001/note/delete/${id}`).then((res) => {
      alert(res.data);
      setData(data.filter((item) => item._id !== id));
    });
  };

  const breakPoints = {
    default: 4,
    1127: 3,
    895: 2,
    620: 1,
  };
  if (isLoading) {
    return (
      <Masonry
        breakpointCols={breakPoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
        // style={{marginBottom:'30px'}}
      >
        {data.map((item, index) => {
          return (
            <Card key={index} sx={{ maxWidth: 345 }} elevation={5}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {item.title[0].toUpperCase()}
                  </Avatar>
                }
                action={
                  <>
                    <IconButton
                      aria-haspopup="true"
                      onClick={() => navigate(`/edit/${item._id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-haspopup="true"
                      onClick={() => deleteNote(item._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
                title={item.title}
                subheader={item.category}
              />

              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Masonry>
    );
  } else {
    return (
      <div
        className="loader_item"
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          margin: "20px 0px",
        }}
      >
        <Skeleton
          count={5}
          style={{ borderRadius: 8, width: 200, marginBottom: "8px" }}
        />
        <Skeleton
          count={5}
          style={{ borderRadius: 8, width: 200, marginBottom: "8px" }}
        />
        <Skeleton
          count={5}
          style={{ borderRadius: 8, width: 200, marginBottom: "8px" }}
        />
        <Skeleton
          count={5}
          style={{ borderRadius: 8, width: 200, marginBottom: "8px" }}
        />
      </div>
    );
  }
};

export default Note;
