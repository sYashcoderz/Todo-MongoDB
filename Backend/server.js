const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017", {
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to DB"))
.catch(console.error);

// app.get('/', (req, res)=> {
//     res.send('Hello World')
// })

const Todo = require('./models/Todo');
const { response } = require('express');

app.get('/todos', async(req, res)=>{
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/todo/new',(req, res)=>{
    console.log("todo",req.body);
    const dodo = new Todo({
        text: req.body.text
    });

    dodo.save();

    res.json(dodo);
})

app.delete('/todo/delete/:id', async(req, res)=> {
    // console.log("here",req.params);
    const result = await Todo.findByIdAndDelete(req.params.id)
    res.json(result);

});

app.get('/todo/complete/:id', async(req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
})


app.listen(4000, () => console.log("Server is Running"))