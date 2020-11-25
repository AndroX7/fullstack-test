const { User } = require('../models/index.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
class UserController {
  static async postLogin(req, res, next) {
    try {
      if(!req.body.password || !req.body.email) {
        next({ name: 'LoginError', message: 'Incorrect Username/Password' });
      } else {
        const userLogin = await User.findOne({ where: { email: req.body.email }})
          if(bcrypt.compareSync(req.body.password,userLogin.password)) {
            let access_token = jwt.sign({ id: userLogin.id, username: userLogin.username, email: userLogin.email, user_status: userLogin.status }, process.env.SECRET_KEY);
            res.status(200).json({
              access_token: access_token,
              username: userLogin.username,
              email: userLogin.email
            })
          } else {
            next({ name: 'LoginError', message: 'Incorrect Username/Password' });
          }
      }
    } catch (err) {
      next(err)
    }
  }
  static async postRegister(req, res, next) {
    try {
      if(!req.body.username || !req.body.email || !req.body.password) {
        next({ name: 'RegisterError', message: "Please Fill the Blank Field"})
      } else {
        const registerUser = await User.create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        })
        if(registerUser) {
          let access_token = jwt.sign({ id: registerUser.id, username: registerUser.username, email: registerUser.email}, process.env.SECRET_KEY);
          res.status(201).json({
            sent_to: registerUser.email,
            message: `User @${registerUser.email} successfully registered!`
          })
        }
      }
    } catch (err) {
      next(err)
    }
  }
  static getContent(req, res) {
    res.status(200).json({
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas scelerisque porttitor turpis viverra lobortis convallis. Libero tristique donec turpis elit adipiscing sit faucibus tincidunt. Erat porttitor amet, nibh id lorem. Volutpat quam vestibulum egestas ut odio odio. Nunc non, feugiat a diam at lacus augue. Sit lacus pharetra eget feugiat aliquam enim adipiscing. Purus nec tortor tellus, neque montes. Gravida ornare eu viverra libero. Vulputate massa turpis posuere nibh dolor pulvinar bibendum. Viverra scelerisque ut dignissim at sit s`
    })
  }
}
module.exports = UserController
