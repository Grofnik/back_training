const express = require('express');
const http = require('http');
const cors = require('cors');
const ToDo = require('./db/models/ToDo.model');
const users = require('./db/models/users.model');
const { initDB } = require('./db');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
initDB();

app.use((req, res, next) => {
  console.log('URL = ', req.url);
  console.log('Original_URL = ', req.originalUrl);
  next();
});

app.post("/todos/registration", function(req,res){
  const mail = req.body.mail;
  const password = req.body.password;
  users.create({
    mail,
    password,
  }).then((result) => {
    console.log(result);
    res.json(result);
  }).catch((error) => { 
    console.log(error)
    res.status(500).json({error});
  });
})

app.post("/todos/login", function(req, res)
{
const results= NULL;
results = users.findAll(
  {
    where:{
      mail: req.body.mail,
      password: req.body.password
    }
  }
)
if (results)
  return true;
else  
  return false;
})

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
