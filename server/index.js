if (process.env.NODE_ENV === 'dev') require('dotenv').load();

const express = require('express');
const bodyParser = require('body-parser');
const mailer = require('nodemailer').createTransport({
  pool: true,
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.post('/', (req, res) => {
  const { name, email, message } = req.body;
  if (typeof name !== 'string') return res.status(422).json({ message: 'Invalid Name' });
  if (typeof email !== 'string') return res.status(422).json({ message: 'Invalid Email' });
  if (typeof message !== 'string') return res.status(422).json({ message: 'Invalid Message' });
  mailer.sendMail({
    from: process.env.EMAIL,
    to: 'sales@technicimpex.com.sg',
    bcc: ['hung.ngn.the@gmail.com', 'tzechong1994@gmail.com'],
    subject: 'Message from Technix Impex Website',
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `
  }, (err) => {
    console.log(err);
    if (err) return res.status(500).json({ message: 'Mailer Error! Try Again Later!' });
    res.status(200).json({});
  });
});

app.use('*', (req, res) => {
  res.status(404).send('Page not found!');
})

app.listen(process.env.PORT, (err) => {
  if (err) throw err;
  console.log('UP AND RUNNING @ ', process.env.PORT);
})