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
            fs.writeFile('./lf.js','this is what i write',function(err,done){
                    if(err){
                        response.end(err);
                    }else{

                        response.end(done);

                    }
                })
            break;
        case '/read':
            console.log("read");
            fs.readFile('./lf.js', 'UTF-8', function (err, done) {
                if (err) {
                     response.end('err')
                    console.log('err')
                } else {
                    console.log('success >>>');
                     response.end(done)
                }
            })
            break;
        case '/rename':
            console.log("rename");
            fs.rename('./lf.js', 'new-name.js', function (err, done) {
                if (err) {
                    response.end('err');
                } else {
                    console.log('success >>>');
                    response.end('success')
                }
            })
            break;
    }
    
    
})
server.listen(8080);