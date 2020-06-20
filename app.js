var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public'));


app.get("/", function(req, res) {
    res.render("index.ejs");
})


app.get("/results", function(req, res) {
    var query = req.query.search;
    var url = "http://omdbapi.com/?apikey=4d5c48b5&s=" + query;

    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body)
            res.render("results", { data: data });
        }
    })
});


app.listen(3000, '127.0.0.1');
console.log('Node server running on port 3000');