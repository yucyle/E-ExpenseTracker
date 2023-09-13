require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const { db } = require('./config/db');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middleware/verifyJWT');
const credentials = require('./middleware/credentials');
// const mongoose = require('mongoose');
const { readdirSync } = require('fs');
const { fileURLToPath } = require('url');


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(credentials)



// Cross Origin Resoure Sharing
app.use(cors(corsOptions));

// built in middleware to handle url encoded data
// in other words: form data
app.use(express.urlencoded({extended: false}));

// built-in middleware for json
app.use(express.json());



const PORT = process.env.PORT || 8000;

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });
//Routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Other headers and options
    next();
});

// middleware for cookies
app.use(cookieParser());

app.use('/auth', require('./routes/auth'));

app.use(verifyJWT);
app.use('/incomes', require('./routes/api/incomes'));
app.use('/expenses', require('./routes/api/expenses'));
// readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));
// app.use('/api/v1', require('./routes/transactions'));

const server = () => {
    db();
    app.listen(PORT, () => {
        console.log('Listening to port:', PORT);
    })
}

server();