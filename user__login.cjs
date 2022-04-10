import express from 'express';
const userRouter = express.Router();
// app.use(express.static(__dirname));


userRouter.post('/login', (req,res)=>{
    console.log('we moved to loginn page')
    res.send('login');
})
userRouter.post('/register', (req,res)=>{
    console.log('we modev to register')
})

export { userRouter};