import Left from "./Instagram";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { usePostStore } from "./zustand/store";
import {
  Box,
  Button,
  Grid,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import Profile from "./Profile";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

export default function Home() {
  const [story, setStory] = React.useState(false);
  return (
    <>
      <Grid container>
        <Grid item xs={2}>
          <Left />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            placeItems: "center",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Stories story={story} setStory={setStory} />
            <Button size="small" onClick={() => setStory(true)}>
              +Add story
            </Button>
          </Box>
          <PostDetails />
        </Grid>
        <Grid item xs={4}>
          <RightNav />
        </Grid>
      </Grid>
    </>
  );
}

function PostDetails() {
  const posts = usePostStore((state) => state.posts);
  const [time, setTime] = React.useState(new Date().toISOString());

  return (
    <Box>
      {posts.map((ele) => {
        return <Post ele={ele} key={ele} time={time} />;
      })}
    </Box>
  );
}

function Post({ ele, time }) {
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  const [expanded, setExpanded] = React.useState(false);
  const [likecount,setLikecount] = React.useState(0);

  return (
    <Card sx={{ maxWidth: 425, marginTop: "20px" }} elevation={0}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            V
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={ele.name}
        subheader={time}
      />
      <CardMedia
        component="img"
        height="194"
        image={ele.image}
        alt="Paella dish"
      />

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteBorderOutlinedIcon
            onClick={() => {
              setLikecount(likecount+1);
            }}
            style={likecount%2==1 ? { fill: "red" } : {fill:"black"}}
          />
        </IconButton>
        <IconButton aria-label="share">
          <ModeCommentOutlinedIcon />
        </IconButton>
      </CardActions>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {ele.name + "   " + ele.caption}
        </Typography>
        <TextField
          id="standard-multiline-static"
          label="Add a comment"
          variant="standard"
          sx={{ width: "500px" }}
        />
      </CardContent>

      <Divider />
    </Card>
  );
}

function Stories({ story, setStory }) {
  const stories = usePostStore((state) => state.stories);

  return (
    <Box>
      <Grid container>
        <Grid item sx={{ display: "flex", gap: "10px" }}>
          {stories.map((storys) => {
            return (
              <Box>
                <Button>
                  <ImageListItem key={storys.image}>
                    <Avatar
                      srcSet={`${storys.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      src={`${storys.image}?w=248&fit=crop&auto=format`}
                      alt={storys.name}
                      loading="lazy"
                      sx={{ width: 56, height: 56 }}
                    />
                    <Typography variant="overline" display="block" gutterBottom>
                      {storys.name}
                    </Typography>
                  </ImageListItem>
                  {story && <StoryDiallog story={story} setStory={setStory} />}
                </Button>
              </Box>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
}
function StoryDiallog({ story, setStory }) {
  const [open, setOpen] = React.useState(story);
  const setStories = usePostStore((state) => state.addStory);
  const [storyDetails, setStoryDetails] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setStory(false);
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Create Story</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="story image URL"
            type="text"
            fullWidth
            variant="standard"
            value={storyDetails}
            onChange={(e) => {
              setStoryDetails(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            onClick={() => setStories({ name: "vinay", image: storyDetails })}
          >
            Post story
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

function RightNav() {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="vinay kumar golla"
          secondary={
            <React.Fragment>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  vinay_kumar_golla
                </Typography>
                <Typography variant="body2" component="span">
                  Switch
                </Typography>
              </Box>
            </React.Fragment>
          }
        />
      </ListItem>
      <ListItem>
        <Box sx={{ display: "flex", gap: "160px" }}>
          <Typography component="span" variant="body2">
            Suggested for you
          </Typography>
          <Typography component="span" variant="body2">
            See All
          </Typography>
        </Box>
      </ListItem>

      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="vinay kumar golla"
          secondary={
            <React.Fragment>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  vinay_kumar_golla
                </Typography>
                <Typography variant="body2" component="span">
                  Switch
                </Typography>
              </Box>
            </React.Fragment>
          }
        />
      </ListItem>

      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="vinay kumar golla"
          secondary={
            <React.Fragment>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  vinay_kumar_golla
                </Typography>
                <Typography variant="body2" component="span">
                  Switch
                </Typography>
              </Box>
            </React.Fragment>
          }
        />
      </ListItem>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="vinay kumar golla"
          secondary={
            <React.Fragment>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  vinay_kumar_golla
                </Typography>
                <Typography variant="body2" component="span">
                  Switch
                </Typography>
              </Box>
            </React.Fragment>
          }
        />
      </ListItem>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="vinay kumar golla"
          secondary={
            <React.Fragment>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  vinay_kumar_golla
                </Typography>
                <Typography variant="body2" component="span">
                  Switch
                </Typography>
              </Box>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
