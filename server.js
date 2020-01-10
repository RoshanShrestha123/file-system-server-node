const fs  = require('fs');
const http = require('http');
let fileName= null;
let urlArr = [];

 function splitUrl(url){
     if(url){
        urlArr =url.split('/');
     }
    

}

// creating server
let server = http.createServer(function(request,response){
    console.log("client connected");
    const url = request.url;
    console.log("curent url", url)
    splitUrl(url);
    switch(urlArr[1]){
        
        case 'write':
            console.log("write");
            
            fs.writeFile(urlArr[2] || 'index.js',urlArr[3],function(error,done){
                    if(error){
                        response.end(error);
                    }else{

                        response.end(done);

                    }
                })
            break;
        case 'read':
            console.log("read");
            fs.readFile(urlArr[2], 'UTF-8', function (error, done) {
                if (error) {
                     response.end(error)
                    console.log('error')
                } else {
                    console.log('success >>>');
                     response.end(done)
                }
            })
            break;
        case 'rename':
            console.log("rename");
            fs.rename(urlArr[2], urlArr[3], function (error, done) {
                if (error) {
                    response.end(error);
                } else {
                    console.log('success >>>');
                    response.end(done);
                }
            })
            break;
        case 'unlink':
            fs.unlink(urlArr[2],function( error,done){
                if(error){
                    console.log("error>>",error);
                    response.end(error);
                }else{
                    console.log("sucess>>", done);
                    response.end(done);
                }
            })
    }
    
    
})
server.listen(8080,function(error,done){
    if(error){
        console.log("server failed",error);
    }else{
        console.log("sucess",done);
    }
});