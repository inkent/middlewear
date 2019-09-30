const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors');
const axios = require('axios');
const app = express()
const port = 3000

var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

var allowedOrigins = ['http://localhost:3000',
                      'https://solarismusicfestival.com','http://solarismusicfestival.com','http://winkcannabis.com','https://winkcannabis.com','https://sofiayorkville.com'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));


app.use(bodyParser.json())



app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})

app.post('/mid', function (req, res) {
console.log(req.body)
	if(req.body){
const response = req.body 
	const payload = {
    'api_key': req.body.key,
    'email_address': req.body.email,
    'fields': {
        'FirstName': req.body.firstName,
        'LastName': req.body.lastName
    },
    'status': 'SUBSCRIBED'
}



axios.post(req.body.url,payload)
.then(e => {
	res.status(200).send('Thank You For Subscribing')
})
.catch(err => {
	// console.log("responded with",err)
	res.status(400).send('Something is Wrong With The Email')
})


	} else {
		res.status(400).send('Invalid Request')
	}
	

})

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// module.exports = app;

app.listen(port, () => console.log(`Example app listening on port ${port}!`))