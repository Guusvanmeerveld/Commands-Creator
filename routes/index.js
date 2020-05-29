var express = require('express');
var router = express.Router();
const commands = require('../public/json/commands.json')

router.get('/', (req, res) => {
  res.render('index');
});

Object.keys(commands).forEach(command => {
  router.get(`/${command}`, (req, res) => {
    console.log("User is visiting " + req.url)
    res.render('commands', {
      title: command
    })
  })
})

module.exports = router;
