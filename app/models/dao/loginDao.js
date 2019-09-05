'use strict';

const Config = require('../../../config/config');
const jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");
var user = require('../dto/users');





/*
 * Login API
 */
let login = async function (req) {
  return new Promise(async function (resolve, reject) {
    try {
      var { email, password } = req
      await user.findOne({email : email}, function(err,data) {
        if(err)   console.log(err);
        if(data)
        {
          var decpass=CryptoJS.AES.decrypt(data.password, Config.database.password);
          var passwordtext = decpass.toString(CryptoJS.enc.Utf8);
          if(email==data.email && password==passwordtext)
          {
            const JWTToken = jwt.sign({
              email: data.email,
              password: passwordtext
            },
             Config.secrettoken,
              {
                expiresIn: '3h'
              });
              resolve({
                code: 200,
                message: 'Login Success!',
                token: JWTToken,
                name:data.name,
                email:data.email
              });
          }
          else{
            resolve({
              code: 200,
              message: 'Login Failure!',
            });
          }
        }
        else
        {
          resolve({
            code: 200,
            message: 'Login Failure!',
          });
        }
      
       
       
    });
   
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
    };




    /**
     * Export to others
     */
    module.exports = {
      login:login
    }