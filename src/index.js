const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');

const sortMiddleware = require('./app/middlewares/sortMiddleware');

const app = express();
const port = 3000;

const route = require('./routes');

const db = require('./config/db');

// Connect to DB
 db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

//Http logger
app.use(morgan('combined'));

app.use(sortMiddleware);

// Template engine
app.engine(
    'handlebars', 
    engine({ 
        extname: '.hbs', 
        helpers: require('./helpers/handlebars'),
        defaultLayout: 'main' 
    }),
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views'));
//console.log('PATH: ', path.join(__dirname, 'resource/views'))

//Route init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
