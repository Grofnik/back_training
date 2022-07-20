const express = require('express');
const Sequelize = require('sequelize');
const http = require('http');
const cors = require('cors');
const ToDo = require('./db/models/ToDo.model');
const users = require('./db/models/users.model');
const tokens = require('./db/models/token.model');
const { initDB } = require('./db');
const app = express();
const bcrypt = require('bcrypt');
const { Console } = require('console');
const crypto = require('crypto');

users.hasMany(tokens, {foreignKey: {name: 'id', type: Sequelize.DataTypes.UUID}})

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
initDB();

app.use((req, res, next) => {
  console.log('URL = ', req.url);
  console.log('Original_URL = ', req.originalUrl);
  next();
});

//регистрация
app.post("/api/registration", async(req,res)=>{
  const password = req.body.password;
  const login = req.body.login;
  const mail = req.body.mail;
  const mail1 = await users.findOne(
    {
      where:{
        mail: req.body.mail
      }
    }
  )
  const login1 = await users.findOne(
    {
      where:{
        login: req.body.login
      }
    }
  )
  if((!mail1) && (!login1)){
     await users.create({
        login,
        mail,
        password
      }).then(result => { 
      console.log(users)
      res.status(200).json(users)
      }).catch((error) => { 
        console.log(error)
        res.status(500).json({error});
    });
  }
  else if(!mail1)
    res.status(400).json("Login was already exist")
  else  
    res.status(400).json("Mail was already exist")
})

// авторизация
app.post("/api/login", async(req, res) =>
{
const user = await users.findOne(
  {
    where:{
      mail: req.body.mail
    }
  }
)
// const login = await users.indOne(
//   {
//     where:{
//       login: req.body.login
//     }
//   }
// )
if (user)
{
  if(req.body.password === user.password)
    {
      const token = crypto.randomBytes(31).toString('hex')
      const user_id=user.id
      await tokens.create({
        user_id: user_id,
        token: token
      }).then(result => { 
        console.log(tokens)
        res.status(200).json(tokens)
        }).catch((error) => { 
          console.log(error)
          res.status(500).json({error});
      });

    }
  else
    res.status(404).json({error: 'Invalid login  or password'})
}
else
{
  res.status(404).json({error:'Invalid login or password'})
}
})

// проверка валидности токена
app.post("/api/token-check", async(req, res) =>
{
  access_token=req.get('x-access-token')
  if(access_token){
    const result = await tokens.findOne(
      {
        where:{
          token: access_token
        }
      }
    )
    if(result)
      res.status(200).json("Token is valid")
    else
      res.status(403).json("Token is not valid")
  }
  else
    res.status(401).json("No Access-Token")
})
//сброс пароля
app.post ("/api/reset_password")

app.post("/api/todos", function (req, response) {
  const title = req.body.title;
  const description = req.body.description;
  const doing = req.body.description;
  ToDo.create({
    title,
    description,
    doing,
  }).then((result) => {
    console.log(result);
    response.json(result);
  }).catch((error) => { 
    console.log(error)
    response.status(500).json({error});
  });

});


app.get('/todos', async(req, res)=>{
  const results = await ToDo.findAll()
  return res.status(200).json(results);
});

app.get('/todos/:id', async(req, res)=>{
  const task=await ToDo.findAll(
    {
      where: {
        id: req.params.id
      }
    }
  )
  return res.status(200).json(task);
});

app.post('/todos/import', async(req, res)=>{
  if ((typeof req.body.title) !== "string" || (typeof req.body.description) !== "string") {
  return res.status(400).json({ message: 'field title was not sent.'});
  }
  const todo = await ToDo.create({...req.body});
  res.status(200).json(todo);
  });

app.patch('/todos/:id', async(req, res)=>{
  const task=await ToDo.update(
    {
      title: req.body.title,
      description: req.body.description
    },{
    where: {
      id: req.params.id
    }}
  )
  return res.status(200).json(task);
});

app.delete('/todos', async(req, res)=>{
  task= ToDo.destroy({
    truncate: true,
  })
  return res.status(200).json(task);
  
});

app.delete('/todos/:id', async(req, res)=>{
   task=ToDo.destroy()
    {
    where: {
      id: req.params.id
    }}
  ;
  return res.status(200).json(task);
});

http.createServer(app).listen(3001, () => {
  console.log('Server is working on port 3001');
})



// promises, async/await, asynchandler
