const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
const config = require('./config/database');
const app = express();
const exphbs = require('express-handlebars');

// View Engine
app.set('views', 'views');
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');


//Connect to DB
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
  console.log('Connected to DB: ' +config.database);
});

//If err on conn
mongoose.connection.on('error', (err) => {
  console.log('DB Error: ' +err);
});

//Include ROUTES
const users = require('./routes/users');
const routes = require('./routes/index');

//Server port
const port = 3000;

// CORS middleware
app.use(cors());

//Static middleware
app.use(express.static(path.join(__dirname, 'public')));

//body-parser middleware
app.use(bodyParser.json());

//passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/', routes);

//ROUTES - Move to index.js ASAP
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

//Start Server
app.listen(port, () => {
  console.log('Server started on port: ' +port);
});
