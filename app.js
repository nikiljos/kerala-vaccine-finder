const express = require("express");
const axios = require('axios');
const bodyParser = require('body-parser')
const app = express();

const port = process.env.PORT || 5000

var centersArray = new Array();
var x = 0;
var districtList = [{ "district_id": 301, "district_name": "Alappuzha" }, { "district_id": 307, "district_name": "Ernakulam" }, { "district_id": 306, "district_name": "Idukki" }, { "district_id": 297, "district_name": "Kannur" }, { "district_id": 295, "district_name": "Kasaragod" }, { "district_id": 298, "district_name": "Kollam" }, { "district_id": 304, "district_name": "Kottayam" }, { "district_id": 305, "district_name": "Kozhikode" }, { "district_id": 302, "district_name": "Malappuram" }, { "district_id": 308, "district_name": "Palakkad" }, { "district_id": 300, "district_name": "Pathanamthitta" }, { "district_id": 296, "district_name": "Thiruvananthapuram" }, { "district_id": 303, "district_name": "Thrissur" }, { "district_id": 299, "district_name": "Wayanad" }]
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

var cowinData = ""

app.set("view engine", "ejs")
app.get("/", function(req, res) {
    res.render('index', { districtList: districtList, cowinData: cowinData, x: x })
    cowinData = ""
})

app.post("/", function(req, res) {
    district = req.body.district



    console.log(district)


    // var result = ""

    var tCap = 0






    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    var formattedDate = date + "-" + month + "-" + year;

    url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=" + district + "&date=" + formattedDate

    axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0',
            },
        }, )
        .then(function(response) {
            cowinData = response.data
            x = length(cowinData.centers)

            function length(cowinData) {
                return Object.keys(cowinData).length;
            }

            // x = length(cowinData.centres);


            // console.log(x)

            dName = cowinData.centers[0].district_name

            var availableCap = 0;




            // console.log("Kot?tayam")

            centersArray.push("Availble slots: " + availableCap)

            centersArray.push("Total centres listed: " + x)

            tCap = tCap + availableCap;


        })
        .catch(function(error) {
            // handle error
            // console.log(error);
            console.log("error in district response")
        })
        .then(function() {


            // console.log("hi");

            // if (tCap > 0) {

            res.redirect('/')

            // }

            // console.log(result)
            // resultData = result
            // console.log(resultData)

        })
})






app.listen(port, function() {

})