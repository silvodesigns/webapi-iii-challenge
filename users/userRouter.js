const express = require('express');
const users = require('./userDb.js');

const router = express.Router();

router.post('/', (req, res) => {

});

//store a new post for a user.
//error adding new post?
router.post('/:id/posts', (req, res) => {

    console.log(req.body, "body");

    const copy = req.body;
    const id = req.params.id;


  //post to be added
    const newPost ={
        text: copy.text,
        user_id: id
    }
    
    console.log(newPost, "post")

    users.insert(newPost)
    .then(post => {
        res.status(201).json(post);
       })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'There was an error while saving the message to the database'
        })
    })

});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

//Add endpoints to retrieve the list of posts for a user
router.get('/:id/posts/',  validateUserId,(req, res) => {
    users.getUserPosts(req.params.id)
   .then( users => {
    res.status(200).json(users);
  })
  .catch(error => {
    res.status(500).json({
    message: 'Error retrieving the user',
    });
  });

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

    const { id } = req.params;
    users.getById(id)
    .then( userbyid => {
        if(userbyid){
            req.user = userbyid;
            next();
        } else {
            res.status('404').json({message:"Invalid user id"})
        }
    })

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {
    const { post } = req.body;
    if(!post){
        return res.status(400).json({message: "missing post data"})
    }
    if(!post.text){
        return res.status(400).json({message: "Missing required text field"})
    } else {
        next()
    }

};

module.exports = router;
