import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { usePostStore } from "./zustand/store";

export default function FormDialog({ dialog, setDialog }) {
  const [open, setOpen] = React.useState(dialog);
  const [image, setImage] = React.useState("");
  const [caption,setCaption] = React.useState("");

  const addPost = usePostStore((state) => state.addPost);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDialog(false);
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
        <DialogTitle>Create a post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Image URL"
            type="text"
            fullWidth
            variant="standard"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="caption"
            label="Caption"
            type="text"
            fullWidth
            variant="standard"
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            onClick={() => {
              addPost({ name: "vinay kumar golla", image: image,caption:caption });
            }}
          >
            POST
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
