const express =require('express');
const app =express();
app.get('/',function(req,res){
    res.send('Hello World');
})

app.listen(3000,function(){
    console.log('server statred on port 3000....');
})