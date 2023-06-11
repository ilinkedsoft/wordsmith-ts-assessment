/********************************************
 * POST http://localhost:3000/accounts
 * GET http://localhost:3000/accounts/:id
 * PUT http://localhost:3000/accounts/:id
 * DELETE http://localhost:3000/accounts/:id
*********************************************/

import express from 'express';
import bodyParser from 'body-parser';

interface Account {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

const accounts: Account[] = [];

const app = express();
app.use(bodyParser.json());

// Create a new account
app.post('/accounts', (req, res) => {
  const { name, address, phone, email } = req.body;

  // Generate a unique ID for the new account
  const id = Math.random().toString(36).substr(2, 9);

  const newAccount: Account = {
    id,
    name,
    address,
    phone,
    email
  };

  accounts.push(newAccount);

  res.status(201).json(newAccount);
});

// Get account information
app.get('/accounts/:id', (req, res) => {
  const { id } = req.params;

  const account = accounts.find((acc) => acc.id === id);

  if (!account) {
    res.status(404).json({ error: 'Account not found' });
  } else {
    res.json(account);
  }
});

// Update an existing account
app.put('/accounts/:id', (req, res) => {
  const { id } = req.params;
  const { name, address, phone, email } = req.body;

  const account = accounts.find((acc) => acc.id === id);

  if (!account) {
    res.status(404).json({ error: 'Account not found' });
  } else {
    account.name = name;
    account.address = address;
    account.phone = phone;
    account.email = email;

    res.json(account);
  }
});

// Delete an account
app.delete('/accounts/:id', (req, res) => {
  const { id } = req.params;

  const accountIndex = accounts.findIndex((acc) => acc.id === id);

  if (accountIndex === -1) {
    res.status(404).json({ error: 'Account not found' });
  } else {
    accounts.splice(accountIndex, 1);
    res.sendStatus(204);
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
