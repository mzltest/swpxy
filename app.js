const express = require('express')
const path = require("path");
const app = express()
const go=require('./go.js')
// #############################################################################
// Logs all request paths and method
app.use(function (req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.path}`);
  next();
});

// #############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
  index: ['index.html'],
  maxAge: '1m',
  redirect: false
}
app.use(express.static('public', options))

// #############################################################################
// Catch all handler for all other request.
app.use('/go', async(req,res) => {
  resp=await go.handler(req)
  res.status(resp.statusCode)
  res.set(resp.rheaders)
  res.send(resp.body)
})

module.exports = app