import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Divider, Grid, ImageList, ImageListItem } from "@mui/material";
import { usePostStore } from "./zustand/store";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

export default function Posts() {
  const posts = usePostStore((state) => state.posts);
  const [dataImage, setDataimage] = React.useState(false);

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Posts" value="1" />
            <Tab label="Reels" value="2" />
            <Tab label="Tagged" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ width: 800, height: 450 }}>
          <ImageList sx={{ width: 800, height: 450 }} cols={3} rowHeight={250}>
            {posts.map((item) => (
              <ImageListItem key={item.image}>
                <img
                  srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.image}?w=164&h=164&fit=crop&auto=format`}
                  alt={item.name}
                  loading="lazy"
                  onClick={() => {
                    setDataimage(true);
                  }}
                />
                {dataImage && (
                  <FullProfileDialog
                    dataImage={dataImage}
                    setDataimage={setDataimage}
                    image={item.image}
                    name={item.name}
                  />
                )}
              </ImageListItem>
            ))}
          </ImageList>
        </TabPanel>
        <TabPanel value="2" sx={{ width: 800, height: 450 }}>
          Item Two
        </TabPanel>
        <TabPanel value="3" sx={{ width: 800, height: 450 }}>
          Item Three
        </TabPanel>
      </TabContext>
    </Box>
  );
}

function FullProfileDialog({ dataImage, setDataimage, name, image }) {
  const [open, setOpen] = React.useState(dataImage);

  const handleClickOpen = () => {
    setOpen(open);
  };
  const handleClose = () => {
    setOpen(false);
    setDataimage(false);
  };
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Grid container>
          <Grid item xs={5}>
            <DialogContent dividers>
              <img src={image} style={{ width: "100%" }} />
              <Divider />
              <Button autoFocus onClick={handleClose}>
                cancel
              </Button>
            </DialogContent>
          </Grid>
        </Grid>
      </BootstrapDialog>
    </React.Fragment>
  );
}
