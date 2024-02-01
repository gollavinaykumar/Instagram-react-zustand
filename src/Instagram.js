import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import GestureOutlinedIcon from "@mui/icons-material/GestureOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import BasicCard from "./Profilecard";
import MediaCard from "./Profilecard";
import FormDialog from "./Dailog";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import Home from "./Home";
import "./App.css"
import { Avatar } from "@mui/material";

const drawerWidth = 240;

export default function Left() {
  const [dialog, setDialog] = React.useState(false);

  const [image, setImage] = React.useState("");

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          }}
        ></AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
         <img src="./insta.png" width={100} style={{margin:"20px",placeItems:"center"}}></img>

          <List>
            {[
              {
                name: "Home",
                icon: <HomeIcon sx={{ fontSize: 40 }} />,
                link : "/"
              },
              {
                name: "Search",
                icon: <SearchOutlinedIcon sx={{ fontSize: 40 }} />,
              },
              {
                name: "Explore",
                icon: <ExploreOutlinedIcon sx={{ fontSize: 40 }} />,
              },
              {
                name: "Reels",
                icon: <SlideshowIcon sx={{ fontSize: 40 }} />,
              },
              {
                name: "Messages",
                icon: <MessageOutlinedIcon sx={{ fontSize: 40 }} />,
              },
              {
                name: "Notifications",
                icon: <FavoriteBorderOutlinedIcon sx={{ fontSize: 40 }} />,
              },
              {
                name: "Create",
                icon: <AddBoxOutlinedIcon sx={{ fontSize: 40 }} />,
              },
              {
                name: "Profile",
                icon: <Avatar src="./Trisandya.jpeg" sx={{ fontSize: 40 }} />,
                link: "/profile",
              },
            ].map((ele) => (
              <Link to={ele.link} className="Link">
                <ListItem key={ele.name} disablePadding >
                  <ListItemButton
                    onClick={() => {
                      {
                        ele.name == "Create" && setDialog(true);
                      }
                    }}
                  >
                    <ListItemIcon>{ele.icon}</ListItemIcon>
                    <ListItemText primary={ele.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          {dialog && <FormDialog dialog={dialog} setDialog={setDialog} />}

          <Toolbar />
          <List>
            {[ "More"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? (
                      <GestureOutlinedIcon sx={{ fontSize: 40 }} />
                    ) : (
                      <MenuOutlinedIcon sx={{ fontSize: 40 }} />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
        </Box>
      </Box>
    </>
  );
}
