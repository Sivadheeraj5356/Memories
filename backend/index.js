require("dotenv").config()
const config = require("./config.json")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const { authenticationToken } = require('./utilies')
mongoose.connect(config.connectionString)
const express = require('express')
const cors = require("cors")
const app = express()
const User = require("./models/user.model")
const Note = require("./models/note.model")

app.use(express.json())
app.use(cors({
    origin:'*'
}))
app.get('/', (req, res)=>{
    res.json({
        data : "hello"
    })
})

app.post('/create-account', async(req,res)=>{
    const {fullName, email , password} = req.body

    if(!fullName){
       return res.status(400).json({
            error : true,
            message : 'Full name is required',
        })
    }
    if(!email){
       return res.status(400).json({
            error : true,
            message : 'email is required',
        })
    }
    if(!password){
       return res.status(400).json({
            error : true,
            message : 'password is required',
        })
    }

    const isUser = await User.findOne({email : email})
    if(isUser){
       return res.json({
            error : true,
            message : "User already exists"
        })
    }

    const user = new User({
        fullName,
        email,
        password
    })
    await user.save()

    const accesstoken = jwt.sign({user} , process.env.ACCESS_TOKEN_SECRET,{
        expiresIn :"3600m"
    })
    return res.json({
        error : false,
        user,
        accesstoken,
        message : "Registration successful"
    })
})

app.post('/login', async(req,res)=>{
    const {email , password}= req.body
    if(!email){
       return res.status(400).json({
            error : true,
            message : "Email is required"
        })
    }
    if(!password){
       return res.status(400).json({
            error : true,
            message : "password is required"
        })
    }
    const userInfo = await User.findOne({email : email})
    if(!userInfo){
        return res.status(400).json({
            error: true,
            message : "User not found"
        })
    }
    if(userInfo.email == email && userInfo.password !== password){
        return res.status(400).json({
            error : true,
            message : "Password is incorrect"
        })
    }
if(userInfo.email == email && userInfo.password === password){
    const user = { user : userInfo}
    const accesstoken = jwt.sign(user , process.env.ACCESS_TOKEN_SECRET,{
        expiresIn :"36000m"
    })
    return res.json({
        user,
        accesstoken,
        error : false,
        message : "Login Successful"
    })
}else{
    return res.status(400).json({
        error : true,
        message : "Invalid credentials"
    })
}

})
app.post('/add-note',authenticationToken, async (req, res)=>{
  const { title, content , tags } = req.body
  const user = req.user.user

  if(!title){
    return res.status(400).json({
        error : true,
        message  : "Enter Title"
    })
  }
  if(!content){
    return res.status(400).json({
        error : true,
        message  : "Enter Content"
    })
  } 
  try{
    const note = new Note({
        title,
        content,
        tags : tags || [],
        userId : user._id,
    })

    await note.save()
    return res.json({
        error : false,
        note,
        message : " Note created successfully"
    })
  }catch (error){
    return res.status(500).json({
        error: true ,
        message : "Internal Server Crash"
    })
  }

})

app.put('/edit-note/:noteId', authenticationToken , async(req,res)=>{
    const noteId = req.params.noteId
    const { title , content , tags , isPinned } = req.body
    const user = req.user.user

    if(!title && !content && tags === undefined && isPinned === undefined){
        return res.status(400).json({
            error : true,
            message: "No changes provided"
        })
    }

    try{
        const note = await Note.findOne({ _id: noteId , userId: user._id})
        if(!note){
            return res.status(404).json({
                error : true,
                message :" note is not present"
            })
        }
        if(title !== undefined){
            note.title = title 
        }
        if(content !== undefined){
            note.content = content
        }
        if(tags !== undefined){
            note.tags = tags 
        }
        if(isPinned !== undefined){
            note.isPinned = isPinned
        }

        await note.save()
        return res.json({
            error : false,
            note,
            message :"note is successfully edited"
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            error :true,
            message : "Internal server error",
            details : error.message
        })

    }
})
app.listen(3000)
module.exports = app