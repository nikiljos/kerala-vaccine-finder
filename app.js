const express = require("express");
const axios = require('axios');

const app = express();
app.get("/", function(req, res) {
    result = getData(300)
    res.send(result)
})


function getData(district) {

    districtID = district

    var resultData = ""

    var tCap = 0



    var centersArray = new Array();


    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    var formattedDate = date + "-" + month + "-" + year;

    url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=" + districtID + "&date=" + formattedDate

    axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0',
            },
        }, )
        .then(function(response) {
            cowinData = response.data


            function length(cowinData) {
                return Object.keys(cowinData).length;
            }

            // x = length(cowinData.centres);

            x = length(cowinData.centers)

            // console.log(x)

            centersArray.push("\n__Kottayam__")

            var availableCap = 0;


            for (m = 0; m < x; m++) {

                // console.log(url);

                y = length(cowinData.centers[m].sessions)

                // console.log(y)
                for (n = 0; n < y; n++) {

                    var cap = cowinData.centers[m].sessions[n].available_capacity;
                    availableCap = availableCap + cap

                    if (cap > 0) {
                        // console.log("inside")
                        // cap.toString();
                        var cName = cowinData.centers[m].name
                        var vName = cowinData.centers[m].sessions[n].vaccine
                        var vDate = cowinData.centers[m].sessions[n].date
                        centersArray.push(cName + " - " + cap + " - " + vName + " - " + vDate)
                    }

                }
            }

            // console.log("Kot?tayam")

            centersArray.push("\nAvailble slots: " + availableCap)

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

            if (tCap > 0) {

                // Here array.values() function is called.
                var iterator = centersArray.values();

                // Here all the elements of the array is being printed.
                for (let elements of iterator) {
                    result = result.concat(elements + "\n");

                }
                // console.log(result)
                return result

            }

            // console.log(result)
            // resultData = result
            // console.log(resultData)

        })

    console.log(resultData)

    return resultData
}



app.listen(5000, function() {

})