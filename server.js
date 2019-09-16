const express = require('express')
var bodyParser = require('body-parser')
const axios = require('axios');
const app = express()
const port = 3000

app.use(bodyParser.json())

app.post('/', (req, res) => {
	const response = req.body 
	const payload = {
    'api_key': '5b7e2585-d348-11e9-be00-06b4694bee2a',
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
	res.status(400).send('Something is Wrong With The Email ')
})


})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))