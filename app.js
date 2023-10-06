const {user,not_allowed,not_found,default_html}=require('./message')
const http=require('http')
const url=require('url')

const server=http.createServer((req,res)=>{
    if(req.method==='GET'){
        const parsedUrl=url.parse(req.url,true)
        const pathname=parsedUrl.pathname
        if(pathname==="/"){
            res.setHeader('Content-Type','html')
            res.writeHead(200)
            res.end(default_html)
        }
        else if(pathname==="/user"){
            res.setHeader('Content-Type', 'application/json');
            try{
                res.end(JSON.stringify(user));
            }
            catch(err){
                res.end("Resource found, but parsing data failed!")
            }
        }
        else{
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(404);
            try{
                res.end(JSON.stringify(not_found))
            }
            catch(err){
                res.end("Resource not found!")
            }
        }
    }
    else{
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(404);
        try{
            res.end(JSON.stringify(not_allowed))
        }
        catch(err){
            res.end("Method not allowed!")
        }
    }
})

server.listen(3000,()=>{
    console.log("Server is running on PORT 3000")
})