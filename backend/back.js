const express = require('express')

const app = express()
const sql = require('mysql2')
const cors = require('cors')

const connection = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '*****',
    database: '*****'
})
//pull check thing
app.use(cors())
app.use(express.json())

const postquery = 'INSERT INTO users VALUES(?, ?)'
app.post('/', (req, res) => {
    if (req.body.type == 'reg') {
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
                connection.query('CREATE TABLE ?? (id VARCHAR(255), items VARCHAR(255))', req.body.login, (err, result) => {
                    if (err) throw err
                    console.log(req.body.login + ' user added')
                })
            }
        })
    }
    else if (req.body.type == 'signin') {
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
    }
    else if (req.body.type == 'getItems') {
        let tablename = req.body.login
        connection.query('SELECT * FROM ??', tablename, (err, rows) => {
            if (err) throw err
            res.send(rows)
        })
    }
    else if (req.body.type == 'addItem') {
        let tablename = req.body.login
        connection.query('INSERT INTO ?? (id, items) VALUES (?, ?)', [tablename, req.body.id, req.body.item], (err, result) => {
            if (err) throw err
            res.send({'msg': 'Item added'})
        })
    }
    else if (req.body.type == 'clear') {
        let tablename = req.body.login
        connection.query('DELETE FROM ?? WHERE 1=1', [tablename, req.body.ids], (err, result) => {
            if (err) throw err
            res.send({'msg': 'Items cleared'})
        })
    }
    else if (req.body.type == 'delItem') {
        let tablename = req.body.login
        connection.query('DELETE FROM ?? WHERE id=?', [tablename, req.body.id], (err, result) => {
            if (err) throw err
            res.send({'msg': 'Item deleted'})
        })
    }
})
app.post('/addItem', (req, res) => {
    let tablename = req.body.login
    connection.query('INSERT INTO ?? (id, items) VALUES (?, ?)', [tablename, req.body.id, req.body.item], (err, result) => {
        if (err) throw err
        res.send({'msg': 'Item added'})
    })
})
app.listen(3000, () => {
    console.log('Sup')
})
