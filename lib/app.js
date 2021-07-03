const express = require('express');
const cors = require('cors');
// const client = require('./client.js');
const app = express();
const morgan = require('morgan');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');
const request = require('superagent');
const { mungeTarot } = require('./munge');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

const authRoutes = createAuthRoutes();

// setup authentication routes to give user an auth token
// creates a /auth/signin and a /auth/signup POST route. 
// each requires a POST body with a .email and a .password
app.use('/auth', authRoutes);

// everything that starts with "/api" below here requires an auth token!
app.use('/api', ensureAuth);

// and now every request that has a token in the Authorization header will have a `req.userId` property for us to see who's talking
app.get('/api/test', (req, res) => {
  res.json({
    message: `in this proctected route, we get the user's id like so: ${req.userId}`
  });
});

app.get('/cards', async(req, res) => {
  try {
    const data = await request.get('https://rws-cards-api.herokuapp.com/api/v1/cards');
    const mungedInfo = mungeTarot(data.body);

    res.json(mungedInfo);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/cards/:type', async(req, res) => {
  try {
    const data = await request.get(`https://rws-cards-api.herokuapp.com/api/v1/cards/search?type=${req.params.type}`);
    const mungedInfo = mungeTarot(data.body);

    res.json(mungedInfo);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
