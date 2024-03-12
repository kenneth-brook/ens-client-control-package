const express = require('express');
const serverless = require('serverless-http');
const { Pool } = require('pg');
const cors = require('cors');
const AWS = require('aws-sdk');

const app = express();
const port = 3000;

const ses = new AWS.SES({
  apiVersion: '2010-12-01',
  region: 'us-east-1'
});

app.use(cors({ origin: true, credentials: true }));

const pool = new Pool({
    user: 'ensclient',
    host: 'proxy-1708523936753-ens-client.proxy-cfzb4vlbttqg.us-east-2.rds.amazonaws.com',
    database: 'postgres',
    password: 'gQ9Sf8cIczKhZiCswXXy',
    port: 5432,
    max: 20,
    ssl: true,
});

app.use(express.static('ens-cp-fe')); 

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/ens-cp-fe/index.html');
});

app.get('/clients', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clients');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/client/:id', async (req, res) => {
    const cid = parseInt(req.params.id, 10);
    console.log('Received ID:', cid);

    try {
        const result = await pool.query('SELECT * FROM clients WHERE id = $1', [cid]);
        console.log('Query Result:', result.rows);

        if (result.rows.length === 0) {
            console.log('User not found');
            return res.status(404).json({ error: `User ${cid} not found` });
        }

        const client = result.rows[0];
        console.log('User found:', client);
        res.status(200).json(client);
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
      text: `INSERT INTO clients(${columns.join(', ')}) VALUES(${values.map((_, i) => `$${i + 1}`).join(', ')}) RETURNING *`,
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

app.put('/clients/:id', async (req, res) => {
    const { id } = req.params; // Extract the key from the route parameter
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ error: 'Invalid JSON object' });
    }

    const columns = Object.keys(data).join(', ');
    const values = Object.values(data);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

    try {
        const result = await pool.query(
            `UPDATE clients
            SET (${columns}) = (${placeholders})
            WHERE id = $${values.length + 1}
            RETURNING *`,
            [...values, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Record not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Error updating data in the database', details: error.message });
    }
});

app.put('/register', async (req, res) => {
  const { key, email, role } = req.body; // Extract user data from the request body

  // Simple validation
  if (!key || !email || !role) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Insert data into the database
    const result = await pool.query(
      'INSERT INTO users(key, email, role) VALUES($1, $2, $3) RETURNING *',
      [key, email, role]
    );

    // Create the continuation URL
    const continuationUrl = `https://portal.911emergensee.com/register/?email=${encodeURIComponent(email)}&key=${encodeURIComponent(key)}`;

    // Prepare the email data for SES
    const params = {
      Destination: {
        ToAddresses: [email]
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `<strong>Hi there! You've been registered with the role: ${role}.</strong> <br> To complete your registration, please <a href="${continuationUrl}">click here</a>.`
          },
          Text: {
            Charset: "UTF-8",
            Data: `Hi there! You've been registered with the role: ${role}. To complete your registration, please follow this link: ${continuationUrl}`
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Complete Your Registration'
        }
      },
      Source: 'registration@911emergensee.com',
    };

    console.log(params)

    // Send the email via SES
    await ses.sendEmail(params).promise();
    console.log('Email sent');

    res.status(201).send({ message: 'User registered successfully', user: result.rows[0] });
  } catch (error) {
    console.error('Error registering user or sending email:', error);
    res.status(500).send({ message: 'Error registering user or sending email' });
  }
});

module.exports.handler = serverless(app, {
  framework: 'express',
});