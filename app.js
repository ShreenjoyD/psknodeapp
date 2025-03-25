const express = require('express');
const app = express();
const PORT=8000;
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs=require('fs');
//const { MongoClient, ServerApiVersion } = require('mongodb');
//const uri = "mongodb+srv://<username>:<Password>@cluster0.v53lv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//const uri = "mongodb+srv://salestimefortheweb:rDVL7CUcS8eMh9Ca@cluster0.v53lv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

/*app.post('/brand', async(req, res) => {
  const {brandname} = req.body;
  const client = new MongoClient(uri, {
  serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  await client.connect();
  const c=await client.db("allbrands").collection('models').findOne({brand:brandname});
  res.send(c.models);
  await client.close();
});

app.post(`/brand/model/year`, async(req, res) => {
  const bname = req.body.brandname;
  const modelName = req.body.mname;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  await client.connect();
  const c=await client.db("allbrands").collection('years').findOne({brand:bname, model:modelName});
  res.send(c.allyrs);
  await client.close();
});

app.post(`/brand/model/year/power`, async(req, res) => {
  const bname = req.body.brandname;
  const modelName = req.body.selectedMod;
  const year = req.body.yvalue;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  await client.connect();
  const c=await client.db("allbrands").collection('powers').findOne({brand:bname, model:modelName, year:year});
  res.send(c.allpws);
  await client.close();
});*/

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

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
});

app.post('/contacts', (req, res)=>{
    const inputs = req.body;
    const i=JSON.stringify(inputs);
    let ob=JSON.parse(i);
    fs.appendFile('queries.txt',`Name: ${ob.fname} ${ob.lname}\nEmail: ${ob.mail}\nPhone: ${ob.pnumber}\nMessage: ${ob.comment}\n\n\n`,function (err) {
    if (err) throw err;
      console.log('Saved!');
    });
    res.status(200);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost: ${PORT}`);
});
