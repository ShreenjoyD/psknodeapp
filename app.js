const express = require('express');
const app = express();
const PORT= process.env.MY_PORT || 8000;
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs=require('fs');
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

app.post('/subscribd', (req, res) => {
    const { news } = req.body;

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'youremailaddress',
          pass: 'yourpassword'
        }
      });

      var mailOptions = {
        from: 'youremailaddress',
        to: news,
        subject: 'PSK Newsletter Greetings',
        html: '<h1>Thank You for subscribing to our Newsletter</h1>'
      };

      transporter.sendMail(mailOptions);
});

app.post('/contacts', (req, res)=>{
    const inputs = req.body;
    const i=JSON.stringify(inputs);
    let ob=JSON.parse(i);
    fs.appendFile('queries.txt',`Name: ${ob.fname} ${ob.lname}\nEmail: ${ob.mail}\nPhone: ${ob.pnumber}\nMessage: ${ob.comment}\n\n\n`);
    res.status(200);
});

app.listen(PORT);
