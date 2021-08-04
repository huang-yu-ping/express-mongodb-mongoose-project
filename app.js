const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const router = require('./router');
const errHandler = require('./middleware/error')


app.use(morgan('dev'))


app.use(express.json());
//app.use(express.urlencoded());

//cors
app.use(cors());
//router
app.use('/api', router);

//error
app.use(errHandler())

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`)
})