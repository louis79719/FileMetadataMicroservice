// server.js
// where your node app starts

var express = require('express');
var app = express();
var upload = require('multer');
var fs = require('fs');

const uploader = upload({dest: 'uploads/'});

app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post("/get-file-size", uploader.single('fileUploaded'), function(request, response, next){
  console.dir( request.file )
  const file = request.file
  var returnObj = {}
  returnObj.size = file.size
  fs.unlink(file.path,function(err){
    if( err ){
      console.error(err)
    }
  })
  response.end( JSON.stringify(returnObj) )
})

// listen for requests :)
var listener = app.listen(process.env.PORT | 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});