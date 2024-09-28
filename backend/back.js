const express = require('express')

const app = express()
const sql = require('mysql2')
const cors = require('cors')

const connection = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users'
})
//pull check thing
app.use(cors())
app.use(express.json())

const postquery = 'INSERT INTO users VALUES(?, ?)'
app.post('/reg', (req, res) => {
    connection.query('SELECT login FROM users', (err, result) => {
        if (err) throw err
        let exists = false
        for (let i = 0; i < result.length; i++) {
            if (result[i].login === req.body.login) {
                exists = true
                break
            }
        }
        if (exists) {
            res.send({'msg': 'User already exists'})
        } else {
            connection.query(postquery, [req.body.login, req.body.password], (err, result) => {
                if (err) throw err
                res.send({'msg': 'User added'})
            })
            connection.query('CREATE TABLE ?? (id VARCHAR(255), items VARCHAR(1000), width INT, height INT)', req.body.login, (err, result) => {
                if (err) throw err
                console.log(req.body.login + ' user added')
            })
        }
    })
})
app.post('/signin', (req, res) => {
    connection.query(`SELECT password FROM users WHERE login=?`, req.body.login, (err, result) => {
        if (err) {
            throw err
        }
        const dbpass = result[0]
        if (dbpass) {
            if (dbpass.password == req.body.password) {
                res.send({'msg': 'true'})
            } else {
                res.send({'msg': 'false'})
            }
        } else {
            res.send({'msg': 'false'})
        }
    })
})
app.post('/getitems', (req, res) => {
    let tablename = req.body.login
    connection.query('SELECT * FROM ??', tablename, (err, rows) => {
        if (err) throw err
        res.send(rows)
    })
})
app.post('/additem', (req, res) => {
    let tablename = req.body.login
    connection.query('INSERT INTO ?? (id, items) VALUES (?, ?)', [tablename, req.body.id, req.body.item], (err, result) => {
        if (err) throw err
        res.send({'msg': 'Item added'})
    })
})
app.post('/editItem', (req, res) => {
    let tablename = req.body.login
    let item = req.body.item
    let width = req.body.width
    let height = req.body.height
    let id = req.body.id
    connection.query('UPDATE ?? SET items=?, width=?, height=? WHERE id=?', [tablename, item, width, height, id], (err, result) => {
        if (err) throw err
        res.send({'msg': 'Item changed'})
    })
})
app.post('/clear', (req, res) => {
    let tablename = req.body.login
    connection.query('DELETE FROM ?? WHERE 1=1', [tablename, req.body.ids], (err, result) => {
        if (err) throw err
        res.send({'msg': 'Items cleared'})
    })
})
app.post('/delItem', (req, res) => {
    let tablename = req.body.login
    connection.query('DELETE FROM ?? WHERE id=?', [tablename, req.body.id], (err, result) => {
        if (err) throw err
        res.send({'msg': 'Item deleted'})
    })
})
app.listen(3000, () => {
    console.log('Sup')
})
