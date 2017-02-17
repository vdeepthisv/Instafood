module.exports = function(app, auth, userModel, passport, localStrategy, GoogleStrategy) {

  app.post("/api/project/user", auth, createUser);

  app.get("/api/project/user/:id", auth, findUserById);
  app.put("/api/project/user/:id", auth, updateUser);

  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  
  
  function createUser(req, res) {
    userModel.createUser(req.body).then(function(createdUser) {
      res.json(createdUser);
    });
  }

  function updateUser(req, res) {
    var id = req.params.id;
    var newUserObj = req.body;
    userModel.updateUser(id, newUserObj).then(function(createdUser) {
      res.json(createdUser);
    });
  }

  function findUserById(req, res) {
    var id = req.params.id;
    userModel.findUserById(id).then(function(createdUser) {
      res.json(createUser);
    });
  }


  passport.use(new GoogleStrategy({     
       clientID: '84943956671-8r9m6mt5igl0gb31afo87n29bpbaq8pq.apps.googleusercontent.com', //pasport keys
         clientSecret:'E5Wyge1Dkg5JloRzpPF5fRYu',
        callbackURL: 'http://localhost:9020/auth/google/callback'
   }, 
    function (token, refreshToken, profile, done) {
      process.nextTick(function () {
        userModel.googleLogin(profile).then(function (user) {
            return done(null, user);
        });
      });
    }
  ));

 
  app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

  app
  .get('/auth/google/callback',
    passport
    .authenticate('google', 
    { failureRedirect: '/project/client/#/login' 
    }),
    function(req, res) {
      res.redirect('/project/client/#/myaccount');
    });
};