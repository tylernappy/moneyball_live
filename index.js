require('dotenv').load()

path = require('path')
express = require('express')
app = express()
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
http = require('http').Server(app)
jsonfile = require('jsonfile')
util = require('util')
needle = require('needle')

qbs = ["Cam Newton", "Matt Ryan"]
wrs = ["Amari Cooper", "Larry Fitzgerald", "Michael Floyd", "DeSean Jackson", "Roddy White", "Martavis Bryant"]
rbs = ["LeSean McCoy", "Eddie Lacy", "T.J. Yeldon"]
tes = ["Jordan Cameron", "Martellus Bennett"]
kickers = ["Adam Vinatieri"]
defenses = ["New York Jets"]

qbOpenings = 1
wrOpenings = 2
rbOpenings = 1
teOpenings = 1
flexOpenings = 2
kickerOpenings = 1
defenseOpenings = 1

starters = {}

jsonFile = {"Week":1,"PPR":0,"Position":"QB","Rankings":[{"week":"1","playerId":"66","name":"Peyton Manning","position":"QB","team":"DEN","standard":"23.20","standardLow":"17.90","standardHigh":"27.38","ppr":"23.20","pprLow":"17.90","pprHigh":"27.38","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"14","name":"Drew Brees","position":"QB","team":"NO","standard":"22.90","standardLow":"18.00","standardHigh":"24.90","ppr":"22.90","pprLow":"18.00","pprHigh":"24.90","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"93","name":"Matt Ryan","position":"QB","team":"ATL","standard":"22.70","standardLow":"17.60","standardHigh":"25.00","ppr":"22.70","pprLow":"17.60","pprHigh":"25.00","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"88","name":"Ben Roethlisberger","position":"QB","team":"PIT","standard":"21.60","standardLow":"14.10","standardHigh":"23.90","ppr":"21.60","pprLow":"14.10","pprHigh":"23.90","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"87","name":"Aaron Rodgers","position":"QB","team":"GB","standard":"20.70","standardLow":"19.00","standardHigh":"29.24","ppr":"20.70","pprLow":"19.00","pprHigh":"29.24","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"13","name":"Tom Brady","position":"QB","team":"NE","standard":"19.60","standardLow":"17.30","standardHigh":"20.38","ppr":"19.60","pprLow":"17.30","pprHigh":"20.38","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"1932","name":"Andrew Luck","position":"QB","team":"IND","standard":"19.20","standardLow":"17.20","standardHigh":"22.38","ppr":"19.20","pprLow":"17.20","pprHigh":"22.38","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"1758","name":"Ryan Tannehill","position":"QB","team":"MIA","standard":"19.00","standardLow":"18.70","standardHigh":"21.10","ppr":"19.00","pprLow":"18.70","pprHigh":"21.10","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"89","name":"Tony Romo","position":"QB","team":"DAL","standard":"18.80","standardLow":"17.00","standardHigh":"20.16","ppr":"18.80","pprLow":"17.00","pprHigh":"20.16","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"1847","name":"Russell Wilson","position":"QB","team":"SEA","standard":"18.40","standardLow":"14.00","standardHigh":"21.30","ppr":"18.40","pprLow":"14.00","pprHigh":"21.30","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"86","name":"Philip Rivers","position":"QB","team":"SD","standard":"18.30","standardLow":"17.00","standardHigh":"21.60","ppr":"18.30","pprLow":"17.00","pprHigh":"21.60","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"65","name":"Eli Manning","position":"QB","team":"NYG","standard":"17.80","standardLow":"15.40","standardHigh":"18.30","ppr":"17.80","pprLow":"15.40","pprHigh":"18.30","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"28","name":"Jay Cutler","position":"QB","team":"CHI","standard":"17.60","standardLow":"15.40","standardHigh":"18.20","ppr":"17.60","pprLow":"15.40","pprHigh":"18.20","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"79","name":"Carson Palmer","position":"QB","team":"ARI","standard":"17.30","standardLow":"13.00","standardHigh":"22.44","ppr":"17.30","pprLow":"13.00","pprHigh":"22.44","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"1394","name":"Colin Kaepernick","position":"QB","team":"SF","standard":"17.30","standardLow":"13.78","standardHigh":"18.50","ppr":"17.30","pprLow":"13.78","pprHigh":"18.50","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"35","name":"Joe Flacco","position":"QB","team":"BAL","standard":"17.10","standardLow":"15.20","standardHigh":"18.36","ppr":"17.10","pprLow":"15.20","pprHigh":"18.36","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"1398","name":"Cam Newton","position":"QB","team":"CAR","standard":"17.10","standardLow":"14.00","standardHigh":"20.70","ppr":"17.10","pprLow":"14.00","pprHigh":"20.70","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"793","name":"Matthew Stafford","position":"QB","team":"DET","standard":"16.90","standardLow":"16.10","standardHigh":"20.88","ppr":"16.90","pprLow":"16.10","pprHigh":"20.88","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"1109","name":"Sam Bradford","position":"QB","team":"PHI","standard":"16.80","standardLow":"13.00","standardHigh":"18.64","ppr":"16.80","pprLow":"13.00","pprHigh":"18.64","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"2801","name":"Marcus Mariota","position":"QB","team":"TEN","standard":"15.90","standardLow":"11.68","standardHigh":"18.00","ppr":"15.90","pprLow":"11.68","pprHigh":"18.00","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"2601","name":"Teddy Bridgewater","position":"QB","team":"MIN","standard":"15.70","standardLow":"12.00","standardHigh":"18.10","ppr":"15.70","pprLow":"12.00","pprHigh":"18.10","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"97","name":"Alex Smith","position":"QB","team":"KC","standard":"15.30","standardLow":"12.30","standardHigh":"18.24","ppr":"15.30","pprLow":"12.30","pprHigh":"18.24","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"34","name":"Ryan Fitzpatrick","position":"QB","team":"NYJ","standard":"14.80","standardLow":"11.40","standardHigh":"17.04","ppr":"14.80","pprLow":"11.40","pprHigh":"17.04","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"1805","name":"Kirk Cousins","position":"QB","team":"WAS","standard":"14.80","standardLow":"12.50","standardHigh":"18.40","ppr":"14.80","pprLow":"12.50","pprHigh":"18.40","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"2812","name":"Jameis Winston","position":"QB","team":"TB","standard":"14.70","standardLow":"10.00","standardHigh":"16.54","ppr":"14.70","pprLow":"10.00","pprHigh":"16.54","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"2627","name":"Blake Bortles","position":"QB","team":"JAC","standard":"14.40","standardLow":"10.50","standardHigh":"15.80","ppr":"14.40","pprLow":"10.50","pprHigh":"15.80","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"1391","name":"Andy Dalton","position":"QB","team":"CIN","standard":"14.30","standardLow":"12.00","standardHigh":"18.60","ppr":"14.30","pprLow":"12.00","pprHigh":"18.60","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"1401","name":"Tyrod Taylor","position":"QB","team":"BUF","standard":"14.30","standardLow":"11.60","standardHigh":"15.50","ppr":"14.30","pprLow":"11.60","pprHigh":"15.50","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"2503","name":"Derek Carr","position":"QB","team":"OAK","standard":"13.70","standardLow":"10.40","standardHigh":"14.90","ppr":"13.70","pprLow":"10.40","pprHigh":"14.90","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"901","name":"Brian Hoyer","position":"QB","team":"HOU","standard":"13.20","standardLow":"9.20","standardHigh":"18.42","ppr":"13.20","pprLow":"9.20","pprHigh":"18.42","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"1801","name":"Nick Foles","position":"QB","team":"STL","standard":"12.60","standardLow":"10.00","standardHigh":"13.60","ppr":"12.60","pprLow":"10.00","pprHigh":"13.60","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"69","name":"Josh McCown","position":"QB","team":"CLE","standard":"11.40","standardLow":"9.00","standardHigh":"13.20","ppr":"11.40","pprLow":"9.00","pprHigh":"13.20","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"1396","name":"Ryan Mallett","position":"QB","team":"HOU","standard":"2.00","standardLow":"1.00","standardHigh":"2.90","ppr":"2.00","pprLow":"1.00","pprHigh":"2.90","injury":null,"practiceStatus":null,"gameStatus":null,"lastUpdate":null},{"week":"1","playerId":"2562","name":"Johnny Manziel","position":"QB","team":"CLE","standard":"1.90","standardLow":"1.00","standardHigh":"2.70","ppr":"1.90","pprLow":"1.00","pprHigh":"2.70","injury":"Elbow","practiceStatus":"","gameStatus":"Questionable","lastUpdate":"2015-09-08"}]}

port = process.env.PORT || 5000

url = "http://www.fantasyfootballnerd.com/service/weekly-rankings/json/" // base_url/api_key/position

app.get('/draft', function(req, res){
  res.render('index', {})
})

app.get('/', function(req, res){
  res.render('lineup', {
    // user: req.user
  })
})

http.listen(port, function() {
  console.log("listening on port " + port)
})

//Functions

findLineup = function() {
  console.log(1)
  var qbsPotentiallyStarting = apiRequestAndRemoval("qb", qbs)
  var wrsPotentiallyStarting = apiRequestAndRemoval("wr", wrs)
  var rbsPotentiallyStarting = apiRequestAndRemoval("rb", rbs)
  var tesPotentiallyStarting = apiRequestAndRemoval("te", tes)
  var kickersPotentiallyStarting = apiRequestAndRemoval("k", kickers)
  var defensesPotentiallyStarting = apiRequestAndRemoval("def", defenses)
  console.log(qbsPotentiallyStarting, wrsPotentiallyStarting, rbsPotentiallyStarting, tesPotentiallyStarting, kickersPotentiallyStarting, defensesPotentiallyStarting)

  // create starters object (omitt flex for now)
  starters.qbs = createStartersArray(qbsPotentiallyStarting, qbOpenings)
  starters.wrs = createStartersArray(wrsPotentiallyStarting, wrOpenings)
  starters.rbs = createStartersArray(rbsPotentiallyStarting, rbOpenings)
  starters.tes = createStartersArray(tesPotentiallyStarting, teOpenings)
  starters.kickers = createStartersArray(kickersPotentiallyStarting, kickerOpenings)
  starters.defenses = createStartersArray(defensesPotentiallyStarting, defenseOpenings)
  // ammend flex positions to starters object
  var flex = []
  var wrsPotentiallyStartingAfterStarters = removeStarters(wrsPotentiallyStarting, wrOpenings)
  var rbsPotentiallyStartingAfterStarters = removeStarters(rbsPotentiallyStarting, rbOpenings)
  var tesPotentiallyStartingAfterStarters = removeStarters(tesPotentiallyStarting, teOpenings)

  flex.concat(wrsPotentiallyStartingAfterStarters, rbsPotentiallyStartingAfterStarters, tesPotentiallyStartingAfterStarters)

  flexSorted = sortFlexAndReturnBest(flex, flexOpenings)
  starters.flex = flexSorted
  console.log(starters)
  return starters
}

sortFlexAndReturnBest = function(flexArray, openings) {
  var len = flexArray.length;
  for (var i = len-1; i>=0; i--){
    for(var j = 1; j<=i; j++){
      if(parseInt(flexArray[j-1].ppr)>parseInt(flexArray[j].ppr)){
          var temp = flexArray[j-1];
          flexArray[j-1] = flexArray[j];
          flexArray[j] = temp;
       }
    }
  }
  var counter = 0
  var flexes
  while (counter < openings) {
    flexes.push(flexArray[counter])
    counter +=1
  }
  return flexes
}

removeStarters = function(positionPotentiallyStarting, openings) {
  var array
  for (var i=0; i<positionPotentiallyStarting.length; i++) {
    if (i>=openings) {array.push(positionPotentiallyStarting[i])}
  }
  return array
}

createStartersArray = function(positionPotentiallyStarting, openings) {
  console.log(4)
  var counter = 0
  var playersArray = []
  while (counter < openings) {
    playersArray.push(positionPotentiallyStarting[counter])
    counter += 1
  }
  return playersArray
}

apiRequestAndRemoval = function(position, players) { //removes players not on rooster
  console.log(2)
  needle.get(url + process.env.API_KEY + "/" + position, function(err, resp, body){ //GET request to API
    if (err) {
      return err
    }
    else {
      console.log(3)
      var playersArray = []
      for (var i=0; i<players.length; i++){ //loop through all players in that position
        for (var j=0; j<body.Rankings.length; j++){ //loop through all players from API call
          if (body.Rankings[j].name === players[i]){
            playersArray.push(body.Rankings[i])
          }
        }
      }
      return playersArray
    }
  })
}

findLineup()
