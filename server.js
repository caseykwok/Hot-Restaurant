var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use("/static", express.static(path.join(__dirname, "public")));

var reservations = [
	{
		routeName: "casey",
		name: "Casey",
		phone: 1234567890,
		email: "casey@gmail.com",
		uniqueId: "Duchess"
	},
	{
		routeName: "david",
		name: "David",
		phone: 2345678901,
		email: "david@gmail.com",
		uniqueId: "Bumbalord"
	},
	{
		routeName: "jerome",
		name: "Jerome",
		phone: 3456789012,
		email: "jerome@gmail.com",
		uniqueId: "Farley"
	}
];

var waitingList = [
	{
		routeName: "rita",
		name: "Rita",
		phone: 4567890123,
		email: "rita@gmail.com",
		uniqueId: "Alfonso"
	}
];

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "/home.html"));
});

app.get("/reserve", function(req, res) {
	res.sendFile(path.join(__dirname, "/reserve.html"));
});

app.get("/reservations?", function(req, res) {
	res.sendFile(path.join(__dirname, "/reservations.html"));
});

app.get("/api/reservations", function(req, res) {
	res.json(reservations);
});

app.get("/api/waitlist", function(req, res) {
	res.json(waitingList);
});

app.post("/api/reservations", function(req, res) {
	// console.log("Request: ", req);
	// console.log("Request Body: ", req.body);
	var newReservation = req.body;
	console.log(newReservation);

	if (reservations.length < 5) {
		reservations.push(newReservation);
		res.send("Yay! You are officially booked!");
	} else {
		waitingList.push(newReservation);
		res.send("Sorry, we're fully booked. You have been added to the waitlist!");
	}
});

// Will redirect users to the home page if doesn't recognize route to be any of the above 
// Must be put last because it will forbid other websites down below to continue running as usual 
app.all("*", function(req, res) {
	res.sendFile(path.join(__dirname + "/home.html"));
});

app.listen(PORT, function() {
	console.log("Listening on PORT " + PORT);
});