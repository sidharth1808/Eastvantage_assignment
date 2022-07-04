import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  
} from "@mui/material";
import IconButton from '@mui/material/IconButton';

import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import { VscRefresh } from 'react-icons/vsc';



const apiLink = "https://randomuser.me/api";
const Home = () => {
  
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")

  const displayRandomName = async()=>{
    try{
   
      const { data:{ results:[ user ] } } = await axios.get(apiLink);
      setEmail(user.email)
      const fullName= user.name.title+" "+user.name.first+" "+user.name.last
      setName(fullName);
   
    
    }catch(e){
      console.log(e);
    }
   
    
  }
  useEffect(()=>{
    displayRandomName();
  },[]);
  useEffect(()=>{
    localStorage.setItem("EMAIL",JSON.stringify(email))
    localStorage.setItem("NAME", JSON.stringify(name))
  },[name,email])
  return (
    <div style={{ display:"flex",justifyContent:"center",marginTop:"150px"}}>
        <Card style={{ width:500, height:230, backgroundColor:"#74b484" }} >
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        <IconButton>
            <PersonIcon fontSize="large"/>
         </IconButton>
        {name}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          <IconButton>
            <EmailIcon/>
         </IconButton>
         {email}
        </Typography>
        </CardContent>
        <CardActions style={{justifyContent:"center"}}>
          
          <IconButton onClick={displayRandomName}><VscRefresh/></IconButton>
        </CardActions>
        
        </Card>
    </div>
  )
}

export default Home;