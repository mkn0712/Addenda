'use strict';

const usersDao = require('../models/dao/usersDao');

/*
 * Add User
 */
let addUser = async function (req, res) {
    try {
        let result = await usersDao.addUser(req.body);
        if(result)
        {
            res.status(200).json({
                code: 200,
                message: 'Success',
                data:result
            });
        }
        else{
            res.status(200).json({
                code: 200,
                message: 'Failure',
            });
        }
        
    } catch (err) {
        console.log(err)
        res.status(200).json({
            code: 400,
            message: 'Error',
        });
    }
}

/*
 * Get All User
 */
let getAllUser = async function (req, res) {
    try {
        let result = await usersDao.getAllUser(req.params.id,req.params.id1)
        if(result)
        {
            res.status(200).json({
                code:200,
                message:"Success",
                data:result
              })
        }
        else{
            res.status(200).json({
                code: 200,
                message: 'Failure',
            });
        }
       
    } catch (err) {
        console.log(err)
        res.status(200).json({
            code: 400,
            message: 'Error',
        });
    }
};


/*
 * Update User
 */
let updateUser = async function (req, res) {
    var QueryAndUpdate = {
        query: {
            _id: req.params.id
        },
        update: req.body
    }
    try {
        let result = await usersDao.updateUser(QueryAndUpdate)
        if(result)
        {
            res.status(200).json({
                code:200,
                message:"User Updated Successfully",
                data:result
              })
        }
        else{
            res.status(200).json({
                code: 200,
                message: 'Failure',
            });
        }
        
    } catch (err) {
        console.log(err)
        res.status(result.code).json({
            code: result.code,
            message: result.message
        });
    }

};





/**
 * Export to others
 */
module.exports = {
    addUser: addUser,
    getAllUser: getAllUser,
    updateUser: updateUser
}