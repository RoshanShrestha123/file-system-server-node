const fs  = require('fs');
const http = require('http');

// creating server
let server = http.createServer(function(request,response){
    console.log("client connected");
    const url = request.url;
    console.log("current url",url);
    switch(url){
        case '/write':
            console.log("write");
            fs.writeFile('./new-name.js','this is what i write',function(error,done){
                    if(error){
                        response.end(error);
                    }else{

                        response.end(done);

                    }
                })
            break;
        case '/read':
            console.log("read");
            fs.readFile('./new-name.js', 'UTF-8', function (error, done) {
                if (error) {
                     response.end(error)
                    console.log('error')
                } else {
                    console.log('success >>>');
                     response.end(done)
                }
            })
            break;
        case '/rename':
            console.log("rename");
            fs.rename('./lf.js', 'new-name.js', function (error, done) {
                if (error) {
                    response.end(error);
                } else {
                    console.log('success >>>');
                    response.end(done);
                }
            })
            break;
        case '/unlink':
            fs.unlink('./new-name.js',function( error,done){
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