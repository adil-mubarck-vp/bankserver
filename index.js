//  server creation 
// 1. import express


const express=require('express')
const jwt=require('jsonwebtoken')


const dataService=require('./data.service')
//  server application create using express
const app=express()


// parse.JSON DATA
app.use(express.json())

// application spesific middilwere
const appMiddlewere=(req,res,next)=>{
console.log("application specific middlewere");
next()
}
// use middlewere in app
app.use(appMiddlewere)

// bank server

const jwtMiddleware=(req,res,next)=>{
    // fetch tocken
try{
    token=req.headers['x-access-tocken']
    console.log(token);
    // verify token
    const data =jwt.verify(token,'superman7373')
    console.log(data);
    next()
}
catch{
    res.status(401).json({
        status:false,
        statusCode:401,
        message:'plese log in'
    })
      


  
}

}

// register API

app.post('/register',(req,res)=>{

    // register solving
    
const result=dataService.register(req.body.username,req.body.acno,req.body.password)

res.status(result.statusCode).json(result)

})


// login 

app.post('/login',(req,res)=>{

    // login solving
    
const result=dataService.login(req.body.acno,req.body.pswd)

res.status(result.statusCode).json(result)

})


// deposit

app.post('/deposit',jwtMiddleware,(req,res)=>{

    // deposit solving
    
const result=dataService.deposit(req.body.acno,req.body.password,req.body.amt)

res.status(result.statusCode).json(result)

})



// withdraW

app.post('/withdraw',(req,res)=>{

    // withdraw solving
    
const result=dataService.withdraw(req.body.acno,req.body.password,req.body.amt)

res.status(result.statusCode).json(result)

})


// transaction

app.post('/transaction',(req,res)=>{

    // withdraw solving
    
const result=dataService.getTransaction(req.body.acno)

res.status(result.statusCode).json(result)

})



// user request resolving

// GET request  to fetch data
app.get('/',(req,res)=>{
    res.send("GET Request")
})

// POST request to create data
app.post('/',(req,res)=>{
    res.send("POST Request")
})


// PUT request to modify entire data
app.put('/',(req,res)=>{
    res.send("PUT Request")
})

// PATCH request to modify partaily
app.patch('/',(req,res)=>{
    res.send("PATCH Request")
})

// DELETE request to delete data
app.delete('/',(req,res)=>{
    res.send("DELETE Request")
})


// set up the code number to the server app

app.listen(3000,()=>{
    console.log("server started at 3000");
})