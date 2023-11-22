const connectToDb = require("./config/connectToDb.js");
const express = require("express");
const noteRoutes = require('./Routes/noteRoutes.js');
const identificationRoutes = require('./Routes/identificationRoutes.js');
const dotenv = require('dotenv');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');



const app = express();
// app.use(cors())
app.use(cors({
    origin: true,
    credentials: true
}));

dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());



app.use('/notes', noteRoutes);
app.use('/', identificationRoutes);

connectToDb(process.env.DB_URL).then((res) => {
    app.listen(process.env.PORT)
}).catch((err) => console.log("Failed to run server"));
