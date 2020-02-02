const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', storeController.homePage);
router.get('/add', storeController.addStore);
router.post('/add', catchErrors(storeController.createStore));

module.exports = router;

// router.get('/', (req, res) => {
//   res.send('Hey! It works!');
//   res.render('hello', {
//     dog: req.query.dog,
//     title: 'I love food'
//   });
// });

