var chet = require("./models/chet");

module.exports =  function(req, res , next){
  switch (req.path) {
    case '/home/test1/test2':
            console.log(req);
            res.send('success')
      break;
    default:

  }
  next();
}
