var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Calculate Postage
app.get('/calculatePostage',getRate )

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


/*
Core Functions for the Postage Calculations
*/
function getRate(req, res) {

	console.log("getting postage");

	var weight = req.query.weight;
	var mailType = req.query.mailType;

	var price = calculateRate(weight, mailType);

	params = {
		weight: weight,
		mailType: mailType,
		price: price,
	}

	res.render('pages/displayRate', params);
}

function calculateRate(weight, mailType) {
	console.log("calculating postage");

	switch(mailType) {
		case "stamped":
			console.log("postage: stamped");
			return 0.49 + (Number(weight) - 1) * 0.21;
			break;
		case "metered":
			console.log("postage: metered");
			return 0.46 + (Number(weight) - 1) * 0.21;
			break;
		case "largeEvn":
			console.log("postage: largeEnv");
			return 0.98 + (Number(weight) - 1) * 0.21;
			break;
		case "parcel":
			console.log("postage: parcel");
			if (Number(weight) >= 4) {
				return 2.67 + (Number(weight) - 4) * 0.18;
			}
			else {
				return 2.67;
			} 
			break;
		default:
			console.log("postage deafault");
	}
}