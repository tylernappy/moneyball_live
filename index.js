express = require('express')
app = express()
http = require('http').Server(app)

port = process.env.PORT || 5000

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
})

http.listen(port, function(){
  console.log("listening on port " + port)
})
