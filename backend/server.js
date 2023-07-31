const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(`${process.env.DB_URI}`, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                })
                .then(()=> console.log('Connected to DB'))
                .catch(console.error);

const Todo = require('./models/todo');

app.get('/todos', async (req, res) => {
    const all_todo = await Todo.find();
    res.json(all_todo);
});

app.post('/todo/new', async (req, res)=> {
    const todo = new Todo({
        text: req.body.text
    });
    await todo.save();
    res.json(todo);
});

app.listen(4000, ()=> console.log(`Connected to server at port ${process.env.PORT}`));