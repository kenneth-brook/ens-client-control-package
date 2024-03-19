const express = require('express');
const serverless = require('serverless-http');
const { Pool } = require('pg');
const cors = require('cors');
const AWS = require('aws-sdk');

const bcrypt = require('bcryptjs');
const saltRounds = 10;

const app = express();
const port = 3000;

const jwt = require('jsonwebtoken');
const jwtSecretKey = '3ea4cfeb-a743-43e1-828c-5aebda66b49c';

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const ses = new AWS.SES({
  apiVersion: '2010-12-01',
  region: 'us-east-2'
});

const verifyToken = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) {
      return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, jwtSecretKey, (err, user) => {
      if (err) {
          return res.status(403).json({ error: 'Token is not valid' });
      }

      // Add user to request
      req.user = user;
      next();
  });
};

const pool = new Pool({
    user: 'ensclient',
    host: 'ens-client-v2.cfzb4vlbttqg.us-east-2.rds.amazonaws.com',
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

app.get('/boot-strap-client/:clientKey', async (req, res) => {
  const clientKey = req.params.clientKey;

  try {
    const client = await pool.query('SELECT * FROM clients WHERE key = $1', [clientKey]);

    if (client.rows.length === 0) {
      res.status(404).json({ error: 'Client not found' });
    } else {
      res.json(client.rows[0]);
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/clients', async (req, res) => {
    try {
    const formData = req.body;

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
    const { id } = req.params;
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
  const { key, email, role } = req.body;

  if (!key || !email || !role) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      'INSERT INTO users(key, email, role) VALUES($1, $2, $3) RETURNING *',
      [key, email, role]
    );

    const continuationUrl = `https://portal.911emergensee.com/register/?email=${encodeURIComponent(email)}&key=${encodeURIComponent(key)}`;

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

    await ses.sendEmail(params).promise();
    console.log('Email sent');

    res.status(201).send({ message: 'User registered successfully', user: result.rows[0] });
  } catch (error) {
    console.error('Error registering user or sending email:', error);
    res.status(500).send({ message: 'Error registering user or sending email' });
  }
});

const corsOptions = {
  origin: "https://portal.911emergensee.com",
  methods: ['PUT'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.put('/update-user', cors(corsOptions), async (req, res) => {
  const { firstName, lastName, phoneNumber, department, city, county, password } = req.body;
  const { key, email } = req.body;

  if (!key || !email) {
      return res.status(400).json({ error: "Missing key or email" });
  }

  let hashedPassword;
  if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
  }

  try {
      let query = 'UPDATE users SET ';
      const queryValues = [];
      let setParts = [];

      if (firstName) {
          queryValues.push(firstName);
          setParts.push(`fname = $${queryValues.length}`);
      }

      if (lastName) {
          queryValues.push(lastName);
          setParts.push(`lname = $${queryValues.length}`);
      }

      if (phoneNumber) {
        queryValues.push(phoneNumber);
        setParts.push(`phone = $${queryValues.length}`);
      }

      if (department) {
        queryValues.push(department);
        setParts.push(`department = $${queryValues.length}`);
      }

      if (city) {
        queryValues.push(city);
        setParts.push(`city = $${queryValues.length}`);
      }

      if (county) {
        queryValues.push(county);
        setParts.push(`county = $${queryValues.length}`);
      }

      if (hashedPassword) {
          queryValues.push(hashedPassword);
          setParts.push(`password = $${queryValues.length}`);
      }

      query += setParts.join(', ');
      query += ` WHERE key = $${queryValues.length + 1} AND email = $${queryValues.length + 2}`;
      queryValues.push(key, email);

      const result = await pool.query(query, queryValues);

      if (result.rowCount === 0) {
          return res.status(404).json({ error: "Client not found" });
      }

      res.json({ message: "Client updated successfully" });
  } catch (error) {
      console.error('Error updating client:', error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
      // Fetch user from the database
      const queryResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = queryResult.rows[0];

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
          return res.status(401).json({ error: 'Invalid credentials' });
      }

      // User authenticated, create and sign the JWT
      const token = jwt.sign(
          { userId: user.id, email: user.email, role: user.role },
          jwtSecretKey,
          { expiresIn: '1h' } // Token expires in 1 hour
      );

      res.status(200).json({
          message: 'Login successful',
          token: token,
          user: { id: user.id, email: user.email, role: user.role, key: user.key, fname: user.fname, lname: user.lname, phone: user.phone }
      });

  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/protected-route', verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports.handler = serverless(app, {
  framework: 'express',
});