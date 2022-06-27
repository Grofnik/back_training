const express = require('express');
const http = require('http');
const cors = require('cors');
const ToDo = require('./db/models/ToDo.model');
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

app.all('/sum', (req, res) => {
  const firstNum = req.query.firstNum;
  const secondNum = req.query.secondNum;
  const vyvod = parseInt(firstNum)+parseInt(secondNum);
  res.send('<h1>'+vyvod+'</h1>');
})

app.all('/reverseCase', (req,res) =>{
  let stroka=req.query.stroka;
  let result='';
  for(let i = 0;i<stroka.length;i++)
  {
    if(stroka[i]==stroka[i].toUpperCase())
      result+=stroka[i].toLowerCase();
    else
      result+=stroka[i].toUpperCase();
  }
  res.json({message:result});
})

app.all('/reverseArray', (req, res) => {
  let arrays=req.query.array;
  let result='<ul>';
  for(let i=arrays.length-1;i>=0;i--)
    result+='<li>'+arrays[i]+'</li>';
  result+='</ul>'
  res.send(result);
})

http.createServer(app).listen(3001, () => {
  console.log('Server is working on port 3001');
})
//Практика номер 2


app.post("/api/todos", function (request, response) {
  const title = req.body.title;
  const description = req.body.description;
  ToDo.create({
    title,
    description,
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

app.post('', async(req, res) => {

});

app.post('/todos/import', async(req, res)=>{
  let bodyExample = {
    title: "wertt",
    description: "wertt"
  };
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





// promises, async/await, asynchandler
