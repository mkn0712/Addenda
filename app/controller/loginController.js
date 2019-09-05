'use strict';

/**
 *  Import DAO
 */
const loginDao = require('../models/dao/loginDao');

/*
 * Login
 */
let login = async function (req, res, next) {
    try {
      
            let result = await loginDao.login(req.body);
            if(result.name && result.token && result.email)
            {
                res.status(result.code).json({
                    code: result.code,
                    message: result.message,
                    token:result.token,
                    name:result.name,
                    email:result.email
                });
            }
            else{
                res.status(result.code).json({
                    code: result.code,
                    message: result.message
                });
            }
            
    } catch (err) {
        console.log(err)
        res.status(result.code).json({
            code: result.code,
            message: result.message
        });
    }
}


/**
 * Export to others
 */
module.exports = {
    login: login,

}