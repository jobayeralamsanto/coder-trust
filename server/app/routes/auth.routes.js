const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "https://wu89z93mp4.execute-api.us-west-2.amazonaws.com/dev/authentication/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("https://wu89z93mp4.execute-api.us-west-2.amazonaws.com/dev/authentication/signin", controller.signin);

  app.get("https://wu89z93mp4.execute-api.us-west-2.amazonaws.com/dev/authentication/confirm-signup/:confirmationCode", controller.verifyUser)
};
