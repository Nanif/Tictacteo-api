let express = require('express');
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.json());

let port = '3000';

const controller = require('./game')

app.post('/game', controller.start)
app.post('/game/user/:userId', controller.createUser)
app.patch('/game/board/:userId', controller.placeShape)
app.get('/game/status', controller.status)


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
