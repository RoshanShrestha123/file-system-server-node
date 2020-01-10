const fs  = require('fs');
const http = require('http');
let fileName= null;
let urlArr = [];

 function splitUrl(url){
     if(url){
        urlArr =url.split('/');
     }
}

function readFile(fileName,response){
    fs.readFile(fileName, 'UTF-8', function (error, done) {
        if (error) {
            response.end("Sorry, "+fileName+" cannot be read. "+ error);
            console.log('error')
        } else {
            console.log('success >>>');
             response.end(done)
        }
    })
}

function writeFile(fileName,contain,response){
    fs.writeFile(fileName|| 'index.js',contain,function(error,done){
        if(error){
            console.log("ERROR >>>",error);
            response.end("Sorry, data cannot be inserted."+error);
        }else{
            console.log("Sucess>>>",done);
            response.end("sucessfully written in the file");
        }
    })
}
function renameFile(oldName,newName,response){
    fs.rename(oldName, newName, function (error, done) {
        if (error) {
            console.log("Error >>>"+error);
            response.end("File name "+oldName+" cannot be converted to "+newName);
        } else {
            console.log('success >>>');
            response.end("File name -> "+oldName+" changed to -> "+newName);
        }
    })
}
function deleteFile(fileName,response){
    fs.unlink(fileName,function( error,done){
        if(error){
            console.log("ERROR>> ",error);
            response.end("File "+fileName+" cannot be delete, File doesnt exist."+error);
        }else{
            console.log("SUCCESS>>", done);
            response.end("File "+ fileName+" sucessfully removed.");
        }
    })
}
// creating server
let server = http.createServer(function(request,response){
    console.log("client connected");
    const url = request.url;
    console.log("curent url", url)
    splitUrl(url);
    switch(urlArr[1]){  
        case 'write':
            writeFile(urlArr[2],urlArr[3],response);
            break;
        case 'read':
            readFile(urlArr[2],response);
            break;
        case 'rename':
            renameFile(urlArr[2],urlArr[3],response);
            break;
        case 'unlink':
            deleteFile(urlArr[2],response);
            break;
        default:
            console.log("sorry,"+ urlArr[1] +" action cannot be completed");
            
    }
    
    
})
server.listen(8080,function(error,done){
    if(error){
        console.log("server failed",error);
    }else{
        console.log("sucess",done);
    }
});