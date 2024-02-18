const express =require('express');
const {port ,mongo_connection_string} =require("./constants/constants")
const app = express();

const Run_port = port

app.listen(Run_port,()=>{
    console.log(`server is running on the port ${Run_port}`);
})
