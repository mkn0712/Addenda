'use strict'


const usersController = require('../controller/usersController');
const loginController = require('../controller/loginController');


async function router(expressApp) {

  console.log("Router called");

  /*
   * REST for User Collection
   */
  expressApp.post('/users', usersController.addUser);
  expressApp.get('/users/:id/:id1', usersController.getAllUser); //id -> pageSize , id1 -> page number selected
  expressApp.put('/users/:id', usersController.updateUser);

  /*
   * REST for Login Page
   */
  expressApp.post('/login', loginController.login);

 
}

/*
 * export to others
 */
exports.router = router;