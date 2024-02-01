import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import "./App.css";
import Posts from "./Posts";

export default function MediaCard() {
  return (
    <Box sx={{ padding: "10px" }}>
      <Box sx={{ display: "flex", gap: "50px", margin: "20px" }}>
        <img src="./Trisandya.jpeg" width={200} />
        <Card sx={{ maxWidth: 360 }} elevation={0}>
          <CardActions>
            <Typography variant="h6">Trisandya</Typography>
            <Button size="medium" variant="outlined">
              Following
            </Button>
            <Button size="medium" variant="outlined">
              Message
            </Button>
          </CardActions>
          <CardContent sx={{ display: "flex", gap: "10px" }}>
            <Typography variant="span">7 Posts </Typography>
            <Typography variant="span">22 Followers</Typography>
            <Typography variant="span">0 Following </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h8">
              Trisandya Technology Solutions Pvt. Ltd.
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="p">Education</Typography>
          </CardContent>
        </Card>
      </Box>
      <Posts />
    </Box>
  );
}
