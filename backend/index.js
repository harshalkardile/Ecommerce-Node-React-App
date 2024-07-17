const express=  require('express');

const app = express();

app.get("/", (req, resp)=>{
    resp.send("Hello World");
    
});

app.listen(5000);
