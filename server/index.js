const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const mysql = require('mysql')
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database : 'ReactJs'
})
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/api/getDetails' ,(req,res) => {
    const sql = "SELECT * FROM task;"
    db.query(sql,(err,result) => {
        res.send(result)
    })
})

app.post('/api/insert',(req,res) => {
    const taskName = req.body.taskName
    const taskType = req.body.taskType
    const sql = "INSERT INTO task (taskName,taskType) VALUES(?,?);"
    db.query(sql,[taskName,taskType],(err,result) => {
        console.log(result)
    })
})

app.delete('/api/delete/:taskName' , (req,res) => {
    const taskName = req.params.taskName
    const sql = "DELETE FROM task WHERE taskName = ?;"
    db.query(sql,taskName,(err,result) => {
        console.log(result)
    })
})

app.put('/api/update/' , (req,res) => {
    const taskName = req.body.taskName
    const taskType = req.body.taskType
    const sql = "UPDATE task SET taskType =? WHERE taskName = ?;"
    db.query(sql,[taskType,taskName],(err,result) => {
        console.log(result)
    })
})

app.listen(3001 , () => {
    console.log('running on port 3001');
})