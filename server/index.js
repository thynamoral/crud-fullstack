const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 8000;
let connection = null;

// create the connection to database
const initMySql = async () => {
    try {
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'survey_info'
        });
    } catch (error) {
        console.log(error.message);
    }
};

// GET method, path = /users
app.get('/users', async (req, res) => {
    try {
        const users = await connection.query('SELECT * FROM users');
        res.json({
            message: "get all users successfully",
            data: users[0]
        });
    } catch (error) {
        res.status(500).json({
            message: "something went wrong!"
        });
        console.log(error.message);
    }
});

// GET method, path = /users/id
app.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const users = await connection.query(
            `SELECT * FROM users WHERE id = ?`, id
        );
        if (users[0].length == 0) {
            throw { statusCode: 404, message: "user not found!" };
        }

        res.json({
            message: `get users ${id} successfully`,
            data: users[0]
        });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: statusCode == 404 ? error.message : "something went wrong!"
        });
        console.log(`error message, ${error.message}`);
    }
});

// POST method, path = /users
app.post('/users', async (req, res) => {
    try {
        const userData = req.body;
        const users = await connection.query(
            'INSERT INTO users SET ?', userData
        );
        res.json({
            message: "create user successfully",
            data: userData
        });
    } catch (error) {
        res.status(500).json({
            message: "something went wrong!"
        });
        console.log(`error message, ${error.message}`);
    }
});

// PUT method, path = /users/id
app.put('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const users = await connection.query(
            'UPDATE users SET ? WHERE id = ?',
            [updateData, id]
        );
        if (users[0].affectedRows == 0) {
            throw { statusCode: 404, message: "user not found!" };
        }

        res.json({
            message: `update user ${id} successfully`
        });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: statusCode == 404 ? error.message : "something went wrong!"
        });
        console.log(`error message, ${error.message}`);
    }
});

// DELETE method, path = /users/:id
app.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const users = await connection.query(
            'DELETE FROM users WHERE id = ?', id
        );
        if (users[0].affectedRows == 0) {
            throw { statusCode: 404, message: "user not found!" };
        }

        res.json({
            message: `delete user ${id} successfully`
        });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: statusCode == 404 ? error.message : "something went wrong!"
        });
        console.log(`error message, ${error.message}`);
    }
})

app.listen(port, async (req, res) => {
    await initMySql();
    console.log(`The server is running at http://localhost:${port}`);
});