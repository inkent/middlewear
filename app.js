const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors');
const axios = require('axios');
const app = express()
const port = 3000

// var fs = require('fs');
// var util = require('util');
// var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
// var log_stdout = process.stdout;

// console.log = function(d) { //
//   log_file.write(util.format(d) + '\n');
//   log_stdout.write(util.format(d) + '\n');
// };

var allowedOrigins = ['http://localhost:3000','http://localhost:8000',
                      'https://solarismusicfestival.com','http://solarismusicfestival.com','http://winkcannabis.com','https://winkcannabis.com','https://sofiayorkville.com'];
app.use(cors());


app.use(bodyParser.json())



app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})

app.post('/mid', function (req, res) {

	if(req.body){
 
	let thepayload = {
    'api_key': req.body.key,
    'email_address': req.body.email,
    'fields': {
        'FirstName': req.body.firstName,
        'LastName': req.body.lastName
    },
    'status': 'SUBSCRIBED'
}
 
const theurl = req.body.url.toString()


axios.post(theurl,thepayload)
.then(e => {
console.log("success",e)
	res.status(200).send('Thank You For Subscribing')
})
.catch(err => {
console.log("error",err)
	res.status(400).send('Something is Wrong With The Email')
})


	} else {
		res.status(400).send('Invalid Request')
	}
	

})

// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

module.exports = app;

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))