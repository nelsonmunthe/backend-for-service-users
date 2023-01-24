require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const credentials = require('./modules/share/middleware/credentials');
const corsOptions = require('./modules/share/config/corsOptions');
const authRouter = require('./routes/auth');
const cityRouter = require('./routes/city');
const userRouter = require('./routes/user');
const roleRouter = require('./routes/role');

// Handle options credentials check - before CORS! and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

app.use(authRouter);
app.use(cityRouter);
app.use(userRouter);
app.use(roleRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
});