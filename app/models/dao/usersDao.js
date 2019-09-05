'use strict';

const Config = require('../../../config/config');
var CryptoJS = require("crypto-js");
var user = require('../dto/users');

/*
 * Add User
 */
let addUser = async function (queryparam) {
  return new Promise(async function (resolve, reject) {
    try {
      console.log('added users',queryparam);
      var query = {
        name: queryparam.name,
        password: CryptoJS.AES.encrypt(queryparam.password, Config.database.password).toString(),
        email: queryparam.email,
        mobileNumber: queryparam.mobileNumber
    };
      let userResult = await user.findOneAndUpdate({
        name: queryparam.name
    }, query, {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
    });
      resolve(userResult)
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

/*
 * Get All User
 */
let getAllUser = async function (pagesize,pageno) {
  return new Promise(async function (resolve, reject) {

    try {
      var pageSize=Number(pagesize)
      var pagination=Number(pageno);

     console.log('No of users in a page->',await user.count())
     let result =await user.find({}).skip((pagination-1)*pageSize).limit(pageSize);
     resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};


/*
 * Update User
 */
let updateUser = async function (updateData) {
  return new Promise(async function (resolve, reject) {
    try {
      console.log('user updated',updateData)
      let result=await user.findOneAndUpdate({
        _id: updateData.query._id
    }, updateData.update, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
    })
      resolve(result)
   
      
    } catch (err) {
      reject(err);
    }
  });
};




/**
 * Export to others
 */
module.exports = {
  addUser: addUser,
  getAllUser: getAllUser,
  updateUser: updateUser
}