"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
var path = require('path');
var Config=require('../config/config')
const user=require('../app/models/dto/users')
var CryptoJS = require("crypto-js");


async function start(router) {
  try {
    let app = express();
    let http = require('http').Server(app);
    app.use(bodyParser.urlencoded({
      extended: false
    }));
    app.use(bodyParser.json());

    /*
     * CORS middleware
     */
    var allowCrossDomain = function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      next();
    }
    app.use(allowCrossDomain);
    app.use(express.static(path.join(__dirname, "../dist")));
    var staticPath = path.join(__dirname, '../dist/index.html')
    app.use('/', express.static(staticPath));

    async function authentication(req, res, next) {
      var nonSecurePaths = ['/login'];

      if (_.includes(nonSecurePaths, req.path) ) return next();
      var authHeader = req.headers.authorization || req.headers.Authorization

      if (req.method === 'OPTIONS') return next();

      if (!(req.headers && authHeader)) {
        return res.status(400).json({
          status: 'Please log in'
        });
      }
      // decode the token
      const header = authHeader.split(' ');
      const token = header[1];
      jwt.verify(token, Config.secrettoken, async function (err, decoded) {
        if (err) {
          return res.status(400).json({
            status: 'Please log in, Token Expired'
          })
        }
        //check decoded username and password from db
        await user.findOne({email : decoded.email}, function(err,data) {
          if(!err)
          {
            if (data.length != 0) {
              var decpass=CryptoJS.AES.decrypt(data.password, Config.database.password);
          var passwordtext = decpass.toString(CryptoJS.enc.Utf8);
              if (data.email != decoded.email && passwordtext!=decoded.password) {
                return res.status(400).json({
                  status: 'Please log in'
                });
              }
            }
            else{
              return res.status(400).json({
                status: 'Please log in'
              });
            }
            return next()
          }
          else{
            console.log(err);
          }
         
        
        })
      })
    }
    app.use(authentication);

    /* configure the routes */
    router(app);
    var port = process.env.PORT || 3003;
    http.listen(port);
    console.log('Server is running on port ', http.address().port);
  } catch (err) {
    console.log(err);
  }
}

exports.start = start;