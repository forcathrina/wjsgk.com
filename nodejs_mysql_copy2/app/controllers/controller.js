
const db = require('../config/db.config.js');

const Datum = db.Datum;

const frame = ['id', 'username', 'usertext']



exports.createDatum = (req, res) => {
  let user = {};

  try{
      // Building user object from upoading request's body
      user.username = req.body.username;
      user.usertext = req.body.usertext;
  
      // Save to MySQL database
      Datum.create(user, 
                        {attributes: frame})
                  .then(result => {    
                    res.status(200).json(result);
                  });
  }catch(error){
      res.status(500).json({
          message: "Fail!",
          error: error.message
      });
  }
}


exports.getDatum = (req, res) => {
  Datum.findByPk(req.params.id, 
                      {attributes: frame})
      .then(user => {
        res.status(200).json(user);
      }).catch(error => {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
      })
}


exports.Data = (req, res) => {
  // find all user information from 
  try{
      Datum.findAll({attributes: frame})
      .then(users => {
          res.status(200).json(users);
      })
  }catch(error) {
      // log on console
      console.log(error);

      res.status(500).json({
          message: "Error!",
          error: error
      });
  }
}


exports.deleteDatum = async (req, res) => {
  try{
      let userId = req.params.id;
      let user = await Datum.findByPk(userId);

      if(!user){
          res.status(404).json({
              message: "Does Not exist a user with id = " + userId,
              error: "404",
          });
      } else {
          await user.destroy();
          res.status(200);
      }
  } catch(error) {
      res.status(500).json({
          message: "Error -> Can NOT delete a user with id = " + req.params.id,
          error: error.message
      });
  }
}


exports.updateDatum = async (req, res) => {
  try{
      let user = await Datum.findByPk(req.body.id);
  
      if(!user){
          // return a response to client
          res.status(404).json({
              message: "Not Found for updating a user with id = " + userId,
              error: "404"
          });
      } else {    
          // update new change to database
          let updatedObject = {
              username: req.body.username,
              usertext: req.body.usertext
          } //여기 수정
          let result = await Datum.update(updatedObject,
                            { 
                              returning: true, 
                              where: {id: req.body.id},
                              attributes: frame
                            }
                          );

          // return the response to client
          if(!result) {
              res.status(500).json({
                  message: "Error -> Can not update a user with id = " + req.params.id,
                  error: "Can NOT Updated",
              });
          }

          res.status(200).json(result);
      }
  } catch(error){
      res.status(500).json({
          message: "Error -> Can not update a user with id = " + req.params.id,
          error: error.message
      });
  }
}


