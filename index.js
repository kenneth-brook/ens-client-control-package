const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({ origin: true, credentials: true }));

const pool = new Pool({
    user: 'ensclient',
    host: 'ens-client.cfzb4vlbttqg.us-east-2.rds.amazonaws.com',
    database: 'ens-client',
    password: 'gQ9Sf8cIczKhZiCswXXy',
    port: 5432,
    max: 20,
    ssl: true,
});

app.use(bodyParser.json());

app.use(express.static('ens-cp-fe'));

app.get('/', (req, res) => {
    res.status(200).send();
});

app.get('/clients', (req, res) => {
    try {
        const result = pool.query('SELECT * FROM public.clients');
        res.json(result.rows);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/clients/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM public.clients WHERE key = $1', [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Not Found' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/clients', async (req, res) => {
    try {
    const formData = req.body;

    // Assuming you have a table named 'form_data' with corresponding columns
    const columns = Object.keys(formData);
    const values = Object.values(formData);

    const query = {
      text: `INSERT INTO form_data(${columns.join(', ')}) VALUES(${values.map((_, i) => `$${i + 1}`).join(', ')}) RETURNING *`,
      values,
    };

    const result = await pool.query(query);

    res.status(200).json({
      message: 'Form data submitted successfully',
      data: result.rows,
    });
  } catch (error) {
    console.error('Error handling form submission:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
});

app.put('/clients/:key', async (req, res) => {
    const { key } = req.params; // Extract the key from the route parameter
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ error: 'Invalid JSON object' });
    }

    const columns = Object.keys(data).join(', ');
    const values = Object.values(data);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

    try {
        const result = await pool.query(
            `UPDATE public.clients
             SET (${columns}) = (${placeholders})
             WHERE key = $${values.length + 1}
             RETURNING *`,
            [...values, key]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Record not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Error updating data in the database' });
    }
});



module.exports.handler = serverless(app, {
    framework: 'express',
  });