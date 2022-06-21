const jwt=require('jsonwebtoken')

db= {
    1000: { "acno": 1000, "username": "lalu", "password": 1000, "balance": 50000 ,transaction:[]}
  }

    // register

    const register =(username, acno, password) =>{
    
    
        if (acno in db) {
         return{
           status:false,
           message:"already registeres plese login",
           statusCode:401
         }
        }
        else {
          //  insert in db
          db[acno] = {
            acno,
            username,
            password,
            "balance": 0,
            transaction:[]
          }
          
          return{
            status:true,
            message:"registered succefully",
            statusCode:200
          }
        }
      }

      // login

      const login=(acno,pswd)=> {
  
       
    
        if(acno in db){
          if(pswd==db[acno]["password"]){
    curentUser=db[acno]["username"]
    curentAcno=acno  

    // tocken generation
token=jwt.sign({
// store account number inside token
curentAcno:acno
},'superman7373')
    
           return{
            status:true,
            message:"login succefully",
            statusCode:200,
            curentUser,
            curentAcno,
            token
           }
          
      }
          else{ 
            return{
              status:false,
              message:"incorect password",
              statusCode:401
            }
          }
        }
        else{ 
          return{
            status:false,
            message:"user does not exist",
            statusCode:401
          }
        }
        
          }

      //  deposit  
    const deposit=(acno,password,amt)=>{
    var amount=parseInt(amt)


    if(acno in db){
      if(password ==db[acno]["password"]){
        db[acno]["balance"]+=amount
        db[acno].transaction.push({
          type: "CREDIT",
          amount:amount
        })
        console.log(db);
        return{
          status:true,
          message:amount+"depositted succefully..new balance is"+db[acno]["balance"],
          statusCode:200
         }
       
      }
      else{
        return{
          status:false,
          message:"incorect password",
          statusCode:401
        }
      }

    }
    else{
      return{
        status:false,
        message:"user does not exist",
        statusCode:401
      }
    }

  }

   //withdraw

    const withdraw=(acno,password,amt)=>{
    var amount=parseInt(amt)

    if(acno in db){
      if(password ==db[acno]["password"]){

        if(db[acno]["balance"]>amount){
          db[acno]["balance"]-=amount
          db[acno].transaction.push({
            type: "DEBIT",
            amount:amount
          })
          return{
            status:true,
            message:amount+"debited succefully..new balance is"+db[acno]["balance"],
            statusCode:200
           }

        }
        else{
          return{
            status:false,
            message:"insuffcient balance",
            statusCode:411
          }
        }
        
      }
      else{
        return{
          status:false,
          message:"incorect password",
          statusCode:401
        }
      }

    }
    else{
      return{
        status:false,
        message:"user does not exist",
        statusCode:401
      }
    }

  }

  // transation

  const  getTransaction=(acno)=>{
   if(acno in  db){
    return {
      status:true,
      statusCode:200,
      transaction:db[acno].transaction
    }
   }
   else{
    return{
      status:false,
      message:"user does not exist",
      statusCode:401
    }
   }
    
  }


    //   export 

    module.exports={
        register,
        login,
        deposit,
        withdraw,
        getTransaction
    }