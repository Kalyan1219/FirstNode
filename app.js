const http=require('http')
const fs=require('fs')
const { buffer } = require('stream/consumers')
http.createServer((req,res)=>{
    const url=req.url
    const method=req.method
    if(url==='/'){
        res.write('<html>')
        res.write('<head><title>MY MESSAGE</title></head>')
        res.write("<body><form action='/message' method='POST' ><input type='text' name='message' ><button type='submit'>Send</button></input></form></body>")
        return res.write("</html>")
    }
    if(url==='/message' && method==='POST'){
        const body=[]
        req.on('data',(Chunck)=>{
            body.push(Chunck)
        })
        return req.on('end',()=>{
            const parsedBody=Buffer.concat(body).toString()
            const message=parsedBody.split('=')[1]
            fs.writeFile('Mes.txt',message)
            res.statusCode=302;
            res.setHeader('Location','/')
            return res.end()
        })
    }
}).listen(4000)