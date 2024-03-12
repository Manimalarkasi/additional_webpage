const bcrypt =require('bcrypt');
const {reject} = require('bcrypt/promises');


const hashpassword = (password)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.genSalt(12,(err,salt)=>{
            if(err){
                reject (err);
            }
            bcrypt.hash(password,salt,(err,hash)=>{
                if(err){
                    reject(err)
                }
                resolve(hash)
            })
        })
    })
};

const comparepassword = (password,hashed)=>{
    return bcrypt.compare(password,hashed)
}

module.exports ={
    comparepassword,hashpassword
}