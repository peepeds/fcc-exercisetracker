require('dotenv').config()
const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const cors = require('cors')
const path = require('path')
const user = require('./router/userRouter')
const exercise = require('./router/exerciseRouter')
const port = 3000 || process.env.PORT

const connectDB = require('./models/connection')
connectDB()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyparser.json())


app.use('/public', express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname ,'views' , '/index.html'))
});

app.use('/api', user);
app.use('/api', exercise);

// app.post('/api/users/:_id/exercises', (req, res) => {
// 	const { description, duration, date} = req.body;
// 	const userId = req.params._id;
// 	console.log({reqBody: req.body}); 
// 	console.log(req.params._id);
// 	console.log(userId);
// });



app.listen(port, () => {
	console.log('Your app is listening on port ' + port);
})