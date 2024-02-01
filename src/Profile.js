import { Grid } from "@mui/material";
import Left from "./Instagram";
import MediaCard from "./Profilecard";

export default function Profile(){
    return(
        <Grid container >
        <Grid item xs={2} >
        <Left/>
        </Grid>
        <Grid item xs={10} sx={{display:"flex",justifyContent:"center",placeItems:"center"}}>
          <MediaCard/>
        </Grid>
      </Grid>
    )
}