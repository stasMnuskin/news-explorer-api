const { errors } = require('celebrate');
const helmet = require('helmet');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { errorHandle } = require('./middleware/errorHandle');
const limiter = require('./middleware/rateLimiter');
const appRouter = require('./routes/index');
const { mongoAddress } = require('./utils/consts');
// const { createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect(mongoAddress, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
}).catch((err) => {
  console.log(err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.options('*', cors());
app.use(limiter);
app.use(requestLogger);

app.use('/', appRouter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use(errorLogger);
app.use(errors());

app.use(errorHandle);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
