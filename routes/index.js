const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/services', (req, res) => {
  res.render('services');
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/client', (req, res) => {
  res.render('client', {layout: false});
});

router.get('/blog', (req, res) => {
  res.render('blog', {layout: false});
});

module.exports = router;
