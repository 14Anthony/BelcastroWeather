$(document).ready(function () {
    //RD =  I create a variable to use that stores my api Key
    const apiKey = "b687fc26097a14c0143460afc3ff610a";
    //RD =  I create a variable to use that stores a second api Key
    const anotherAK = "e729368ffa3e5eddf8c7ff009152e6bc";
    //RD =  I create a variable to use that stores value of the city, this one empty.
    let city; // = $('#search').val().trim();
    //RD =  I create a variable to use that stores value of the of the submit button?....might be extra?
    const submit = $('#submit');

    //--------------------------------------------------------------------------------------------------  
    const format = "LLLL";

    const result = moment().format(format);
    const startTime = moment().startOf('day').format();
    const current = moment().format('H');
    // console.log(current);
    // console.log(result);
    // console.log(startTime);

    // append date to currentDay

    const currentDay = $("#currentDay").append(result);

    //--------------------------------------------------------------------------------------------------

    // RD = I need to have a clean bucket each time the button is pressed, so i either clear the display and make in none, or I remove the bucketitems and recreate them?  Per Zach, here are a couple of options.  to test.
    //$('#historyArea').display = "none";
    // $('#historyArea').remove() From Zach
    // $('#historyArea').empty()  From Travis ***

    //$('#currentWeather').display = "none";
    //$('#currentWeather').remove()From Zach
    //$('#currentWeather').empty() From Travis ***


    // this might be helpful to use in a variable ...??? 
    let recent = localStorage.getItem('recent');

    //--------------------------------------------------------------------------------------------------------

    // RD= I need to create an onclick button, that I want to console log, and find it "setItem"  in the local storage like the last homework 5
    $('#submit').on('click', function () {
        // RD =  here I am capturing the input values, and triming ||||||The $.trim() function removes all newlines, spaces (including non-breaking spaces), and tabs from the beginning and end of the supplied string. If these whitespace characters occur in the middle of the string, they are preserved.|||||| them, and then placing that value in the empty variable city.
        let city = $('#search').val().trim();
        //RD =  I ned to find out whether or not I was able to capture the values above, and I do that by logging the iformation in the consule.  It should show up as the input place on the page and after the button clicked.  
        console.log(city);
        //RD=  I am taking the code from homework 5, and placing it here with theS new variable city.   This section of code will place the value of city, with the key Recent in localstorage
        localStorage.setItem("recent", city); // it didn't set to localStorage with or without JSON.stringify.   hmm.
        currentWeather(city)
        // uvForcast()
        fiveDayForcast(city)
        $('#search').val('');
    });


    // RD= I need to create an enterpress, that I want to console log, and find it "setItem"  in the local storage like the last homework 5
    $('#search').keypress(function (event) {
        console.log('CLICK')
        if (event.keyCode === 13) {
            // RD =  here I am capturing the input values, and triming ||||||The $.trim() function removes all newlines, spaces (including non-breaking spaces), and tabs from the beginning and end of the supplied string. If these whitespace characters occur in the middle of the string, they are preserved.|||||| them, and then placing that value in the empty variable city.
            let city = $('#search').val().trim();
            //RD =  I ned to find out whether or not I was able to capture the values above, and I do that by logging the iformation in the consule.  It should show up as the input place on the page and after the button clicked.  
            console.log(city);
            //RD=  I am taking the code from homework 5, and placing it here with theS new variable city.   This section of code will place the value of city, with the key Recent in localstorage
            localStorage.setItem("recent", city); // it didn't set to localStorage with or without JSON.stringify.   hmm.
            currentWeather(city)

            // uvForcast()
            fiveDayForcast(city)
            $('#search').val('');
        }
    });


    // RD =  Here I am going to capture the #search id from the local storage and place it on the html.......

    //RD= have created buttons and placed them in a container with the name on the button associated with the value rendered from the #submit section so now I want to target all of the button in the container that represent the former searches that were made and listen for a button click that will then trigger the same information as the original button does
    // the container I want to target has an ID of searchHistory

    //RD =  Here I call the container using Jquery and create and eventlistener for the button click.
    // and I am going to create a function that is trigger from that click to capture and disperse values.

    $(document).on('click', '.thePast', function () {
        console.log('Click');
        //RD =  here is were I target the content of the buttons to pass along to functions to be place below
        //let city = event.target.text("<button>");
        let city = $(this).text()//.split(text);

        console.log(city); //Now I get all of the text from all of the buttons.  I need to get more specific
        //JSON.parse(city);
        //console.log(city);
        //RD  =  Here I need to set the iformation to the local storage
        localStorage.setItem('past', city);
        currentWeather(city)
        fiveDayForcast(city)
    })
    //-------------------------------------------------------------------------------------------------------------


    //RD =  here I am creating a function, that will use the jQuery .ajax function, to call to an api, openweathermap, and input the city value, and apiKey variables into the URL request and get a response.

    //API CALL EXAMPLE = api.openweathermap.org/data/2.5/weather?q=London&APPID=e729368ffa3e5eddf8c7ff009152e6bc

    function currentWeather(city) {
        //city = $('#search').val().trim();
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial",
            method: 'GET',
        }).then(function (response) {
            // RD =  I now, take the RESPONSE, and place it in a variable called results...
            const results = response;
            //RD =  I ned to find out whether or not I was able to capture the values above, and I do that by logging the information in the console.  It should show up as an object in the consule. 
            //console.log(results);
            // ---- Fixed---- there was a period before api on the URL  Unstuck by JJ & MIKE----FIXED-----this generated a 401, a 404 and now a "net::ERR_NAME_NOT_RESOLVED" so apperantly it take a couple of hours for the API key to be used.

            //--------------------------------------------------------------------------------


            // RD = Project require that I make things appear, that I am going to have to post this somehow to the html.about-me-header
            // pre RD =  prior to that, I am going to have to clear it off the board to replace.  Google fu the how to make the style and display have an empty container after the second onclick target the second click functionality??? if there is such a thing........I think ......
            //WHEN I view current weather conditions for that city THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index


            //---------------------------------------------------------------------------------   

            //  Here is where I empty the bucket thru jQuery, capturing Id cW and emptying.
            $('#currentWeather').empty()

            // here I create the buckets for the information:

            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const cityName = $('<h3>').appendTo('#currentWeather');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const date = $("<p>").appendTo('#currentWeather');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const icon = $('<img>').appendTo('#currentWeather');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const temp = $('<p>').appendTo('#currentWeather');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const humidity = $('<p>').appendTo('#currentWeather');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const windSpeed = $('<p>').appendTo('#currentWeather');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            // Here I need to capture the infromation from the response object, and place the lotion in the basket...lol it does it whenever its told...lol  for whomever is grading here is your mid-day levity....You're welcome.  object to text.....?


            //const pastSch = $("<button>").appendTo('#searchHistory');
            const pastS = $('<button>')
            pastS.addClass('thePast')
            pastS.text(response.name)
            $('#searchHistory').append(pastS)
            //-------------------------------------------------------------------------------------------------------

            // RD  =I must search the response, to find where the attributes exhist in the object in the console, from there I need to capture the new variable, from above and add text to the buckets, in the form of key and value pairs given by the object.  

            //.text()  VThe.text () method cannot be used on form inputs or scripts. To set or get the text value of input or textarea elements, use the.val () method. To get the value of a script element, use the.html () method. As of jQuery 1.4, the.text () method returns the value of text

            //The .attr() method gets the attribute value for only the first element in the matched set. To get the value for each element individually, use a looping construct such as jQuery's .each() or .map() method.Using jQuery's .attr() method to get the value of an element's attribute has two main benefits:

            // Convenience: It can be called directly on a jQuery object and chained to other jQuery methods.
            // Cross-browser consistency: The values of some attributes are reported inconsistently across browsers, and even across versions of a single browser. The .attr() method reduces such inconsistencies.

            //------------------------------------------------------------------------------------------------------------------

            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            $(cityName).text(results.name);
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            $(date).text("Today's Weather:");
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.URL is http://openweathermap.org/img/wn/10d@2x.png
            $(icon).attr('src', "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.°	\xB0	&#176;	&deg;	%B0	%C2%B0	degree sign
            $(temp).text("Temp:  " + results.main.temp + "°F");
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            $(humidity).text("Humidity:  " + results.main.humidity);
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            $(windSpeed).text("WindSpeed:  " + results.wind.speed);
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            //console.log(response.coord.lat);
            //console.log(response.coord.lon);
            uvForcast(response.coord.lat, response.coord.lon)
            // here i create a button, that will collect the response.name add it on a button and place it in the Search history
            // $(pastSch).text(response.name);
        })
        //return            // (results)
    }
    //------------------------------------------------------------------------------------------------------------------


    //RD =  here I am creating a funtion, that will use the jQuery .ajax function, to call to an api, openweathermap, and input the city value, and apiKey variables into the URL request and get a response of the next uvForcast 
    // api call url example:   :   :  http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}

    function uvForcast(lat, lon) {
        //city = $('#search').val() //.trim();
        console.log(lat, lon);

        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + anotherAK + "&lat=" + lat + "&lon=" + lon, //RD = created a new appid because of the 401 error, and now both appid are accepted the erro continues in a different manner. as seen in line 37 of the current Weather function.
            method: 'GET',
        }).then(function (response) {
            // RD =  I now, take the RESPONSE, and place it in a variable called results...
            const results = response;
            //RD =  I need to find out whether or not I was able to capture the values above, and I do that by logging the information in the console.  It should show up as an object in the consule. 
            // console.log(results);


            const uvIndex = $('<p>').appendTo('#currentWeather');
            $(uvIndex).text("UV:  " + response.value);
        })
        // RD = I am going to have to post this somehow to the html.. and prior to that, I am going to have to clear it off the board to replace, and primarily I am going to have to get the value or return the value into a a variable to then use and pass thru.
    }

    // function uvForcast1(lat, lon) {
    //     city = $('#search').val() //.trim();
    //     console.log(lat, lon);

    //     $.ajax({
    //         url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + anotherAK + "&lat=" + lat + "&lon=" + lon, //RD = created a new appid because of the 401 error, and now both appid are accepted the erro continues in a different manner. as seen in line 37 of the current Weather function.
    //         method: 'GET',
    //     }).then(function (response) {
    //         // RD =  I now, take the RESPONSE, and place it in a variable called results...
    //         const results = response;
    //         //RD =  I need to find out whether or not I was able to capture the values above, and I do that by logging the information in the console.  It should show up as an object in the consule. 
    //         //console.log(results);


    //         const uvIndex = $('<p>').appendTo('#forcastWeather1');
    //         $(uvIndex).text("UV:  " + response.value);
    //     })
    //     // RD = I am going to have to post this somehow to the html.. and prior to that, I am going to have to clear it off the board to replace, and primarily I am going to have to get the value or return the value into a a variable to then use and pass thru.
    // }
    // RD  NOW I NEED TO SHORTEN ALL THE REPETITIONS OF SAME CODE BY ADDING ANOTHER PARAMETER, THIS WILL GET RID OF THE THE FIVE UV FORCASTS BY ADDING NUM TO THE LAT AND LON   LOOK TO LINE 234  LINES 390 - 395 the third parameter is entered.
    function uvForcastAll(lat, lon, num) {
        city = $('#search').val() //.trim();
        console.log(lat, lon);

        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + anotherAK + "&lat=" + lat + "&lon=" + lon, //RD = created a new appid because of the 401 error, and now both appid are accepted the erro continues in a different manner. as seen in line 37 of the current Weather function.
            method: 'GET',
        }).then(function (response) {
            // RD =  I now, take the RESPONSE, and place it in a variable called results...
            const results = response;
            //RD =  I need to find out whether or not I was able to capture the values above, and I do that by logging the information in the console.  It should show up as an object in the consule. 
            //console.log(results);


            const uvIndex = $('<p>').appendTo('#forcastWeather' + num);  //    JERE IS WHERE THE SHORTENING OCCURS  ADDING NUM HERE 
            $(uvIndex).text("UV:  " + response.value);
        })
        // RD = I am going to have to post this somehow to the html.. and prior to that, I am going to have to clear it off the board to replace, and primarily I am going to have to get the value or return the value into a a variable to then use and pass thru.
    }

    //   //  function uvForcast2(lat, lon) {
    //         city = $('#search').val() //.trim();
    //         //console.log(lat, lon);

    //         $.ajax({
    //             url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + anotherAK + "&lat=" + lat + "&lon=" + lon, //RD = created a new appid because of the 401 error, and now both appid are accepted the erro continues in a different manner. as seen in line 37 of the current Weather function.
    //             method: 'GET',
    //         }).then(function (response) {
    //             // RD =  I now, take the RESPONSE, and place it in a variable called results...
    //             const results = response;
    //             //RD =  I need to find out whether or not I was able to capture the values above, and I do that by logging the information in the console.  It should show up as an object in the consule. 
    //             console.log(results);


    //             const uvIndex = $('<p>').appendTo('#forcastWeather2');
    //             $(uvIndex).text("UV:  " + response.value);
    //         })
    //         // RD = I am going to have to post this somehow to the html.. and prior to that, I am going to have to clear it off the board to replace, and primarily I am going to have to get the value or return the value into a a variable to then use and pass thru.
    //     }

    function uvForcast3(lat, lon) {
        city = $('#search').val() //.trim();
        //console.log(lat, lon);

        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + anotherAK + "&lat=" + lat + "&lon=" + lon, //RD = created a new appid because of the 401 error, and now both appid are accepted the erro continues in a different manner. as seen in line 37 of the current Weather function.
            method: 'GET',
        }).then(function (response) {
            // RD =  I now, take the RESPONSE, and place it in a variable called results...
            const results = response;
            //RD =  I need to find out whether or not I was able to capture the values above, and I do that by logging the information in the console.  It should show up as an object in the consule. 
            console.log(results);


            const uvIndex = $('<p>').appendTo('#forcastWeather3');
            $(uvIndex).text("UV:  " + response.value);
        })
        // RD = I am going to have to post this somehow to the html.. and prior to that, I am going to have to clear it off the board to replace, and primarily I am going to have to get the value or return the value into a a variable to then use and pass thru.
    }

    function uvForcast4(lat, lon) {
        city = $('#search').val() //.trim();
        //console.log(lat, lon);

        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + anotherAK + "&lat=" + lat + "&lon=" + lon, //RD = created a new appid because of the 401 error, and now both appid are accepted the erro continues in a different manner. as seen in line 37 of the current Weather function.
            method: 'GET',
        }).then(function (response) {
            // RD =  I now, take the RESPONSE, and place it in a variable called results...
            const results = response;
            //RD =  I need to find out whether or not I was able to capture the values above, and I do that by logging the information in the console.  It should show up as an object in the consule. 
            console.log(results);


            const uvIndex = $('<p>').appendTo('#forcastWeather4');
            $(uvIndex).text("UV:  " + response.value);
        })
        // RD = I am going to have to post this somehow to the html.. and prior to that, I am going to have to clear it off the board to replace, and primarily I am going to have to get the value or return the value into a a variable to then use and pass thru.
    }

    function uvForcast5(lat, lon) {
        city = $('#search').val() //.trim();
        // console.log(lat, lon);

        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + anotherAK + "&lat=" + lat + "&lon=" + lon, //RD = created a new appid because of the 401 error, and now both appid are accepted the erro continues in a different manner. as seen in line 37 of the current Weather function.
            method: 'GET',
        }).then(function (response) {
            // RD =  I now, take the RESPONSE, and place it in a variable called results...
            const results = response;
            //RD =  I need to find out whether or not I was able to capture the values above, and I do that by logging the information in the console.  It should show up as an object in the consule. 
            console.log(results);


            const uvIndex = $('<p>').appendTo('#forcastWeather5');
            $(uvIndex).text("UV:  " + response.value);
        })
        // RD = I am going to have to post this somehow to the html.. and prior to that, I am going to have to clear it off the board to replace, and primarily I am going to have to get the value or return the value into a a variable to then use and pass thru.
    }



    //------------------------------------------------------------------------------------------------------------------------------



    //URL is http://openweathermap.org/img/wn/10d@2x.png  this for the icon.

    //RD =  here I am creating a funtion, that will use the jQuery .ajax function, to call to an api, openweathermap, and input the city value, and apiKey variables into the URL request and get a response of the next fiveDayForcast
    function fiveDayForcast(city) {
        //city = $('#search').val() //.trim();
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + anotherAK,
            method: 'GET',
        }).then(function (response) {
            // RD =  I now, take the RESPONSE, and place it in a variable called results...
            const results = response;
            //RD =  I ned to find out whether or not I was able to capture the values above, and I do that by logging the information in the console.  It should show up as an object in the consule. 
            // console.log(results);



            //---------------------------------------------------------------------------------Code for forcast day 1 of 5--------------------------------------------

            $('#forcastWeather1').empty()
            // here I create the buckets for the information:
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const cityName1 = $('<h3>').appendTo('#forcastWeather1');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const date1 = $("<p>").appendTo('#forcastWeather1');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const icon1 = $('<img>').appendTo('#forcastWeather1');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const temp1 = $('<p>').appendTo('#forcastWeather1');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const humidity1 = $('<p>').appendTo('#forcastWeather1');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const windSpeed1 = $('<p>').appendTo('#forcastWeather1');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            // Here I need to capture the infromation from the response object, and place the lotion in the basket...lol it does it whenever its told...lol  for whomever is grading here is your mid-day levity....You're welcome.  object to text.....?


            //-------------------------------------------------------------------------------------------------------

            // RD  =I must search the response, to find where the attributes exhist in the object in the console, from there I need to capture the new variable, from above and add text to the buckets, in the form of key and value pairs given by the object.  

            //.text()  VThe.text () method cannot be used on form inputs or scripts. To set or get the text value of input or textarea elements, use the.val () method. To get the value of a script element, use the.html () method. As of jQuery 1.4, the.text () method returns the value of text

            //The .attr() method gets the attribute value for only the first element in the matched set. To get the value for each element individually, use a looping construct such as jQuery's .each() or .map() method.Using jQuery's .attr() method to get the value of an element's attribute has two main benefits:

            // Convenience: It can be called directly on a jQuery object and chained to other jQuery methods.
            // Cross-browser consistency: The values of some attributes are reported inconsistently across browsers, and even across versions of a single browser. The .attr() method reduces such inconsistencies.

            // //------------------------------------------------------------------------------------------------------------------

            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            $(cityName1).text(results.city.name);
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            $(date1).text("Forcast Day 1:");
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.URL is http://openweathermap.org/img/wn/10d@2x.png
            $(icon1).attr('src', "http://openweathermap.org/img/wn/" + results.list[1].weather[0].icon + "@2x.png");
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.°	\xB0	&#176;	&deg;	%B0	%C2%B0	degree sign
            $(temp1).text("Temp:  " + ((((results.list[1].main.temp) - 273.15) * 1.8 + 32).toPrecision(3)) + "°F");
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            $(humidity1).text("Humidity:  " + results.list[1].main.humidity);
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            $(windSpeed1).text("WindSpeed:  " + results.list[1].wind.speed);
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            //console.log(response.coord.lat);
            //console.log(response.coord.lon);
            uvForcastAll(response.city.coord.lat, response.city.coord.lon, 1)
            uvForcastAll(response.city.coord.lat, response.city.coord.lon, 2)
            // uvForcastAll(response.city.coord.lat, response.city.coord.lon, 3)
            // uvForcastAll(response.city.coord.lat, response.city.coord.lon, 4)
            // uvForcastAll(response.city.coord.lat, response.city.coord.lon, 5)


            // //--------------------------------------day 2 of 5 --------------------------------------------------------------------------------


            $('#forcastWeather2').empty()
            // here I create the buckets for the information:
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const cityName2 = $('<h3>').appendTo('#forcastWeather2');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const date2 = $("<p>").appendTo('#forcastWeather2');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const icon2 = $('<img>').appendTo('#forcastWeather2');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const temp2 = $('<p>').appendTo('#forcastWeather2');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const humidity2 = $('<p>').appendTo('#forcastWeather2');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const windSpeed2 = $('<p>').appendTo('#forcastWeather2');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            // Here I need to capture the infromation from the response object, and place the lotion in the basket...lol it does it whenever its told...lol  for whomever is grading here is your mid-day levity....You're welcome.  object to text.....?



            //-------------------------------------------------------------------------------------------------------

            // RD  =I must search the response, to find where the attributes exhist in the object in the console, from there I need to capture the new variable, from above and add text to the buckets, in the form of key and value pairs given by the object.  

            //.text()  VThe.text () method cannot be used on form inputs or scripts. To set or get the text value of input or textarea elements, use the.val () method. To get the value of a script element, use the.html () method. As of jQuery 1.4, the.text () method returns the value of text

            //The .attr() method gets the attribute value for only the first element in the matched set. To get the value for each element individually, use a looping construct such as jQuery's .each() or .map() method.Using jQuery's .attr() method to get the value of an element's attribute has two main benefits:

            // Convenience: It can be called directly on a jQuery object and chained to other jQuery methods.
            // Cross-browser consistency: The values of some attributes are reported inconsistently across browsers, and even across versions of a single browser. The .attr() method reduces such inconsistencies.

            //------------------------------------------------------------------------------------------------------------------

            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            $(cityName2).text(results.city.name);
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            $(date2).text("Forcast Day 2:");
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.URL is http://openweathermap.org/img/wn/10d@2x.png
            $(icon2).attr('src', "http://openweathermap.org/img/wn/" + results.list[2].weather[0].icon + "@2x.png");
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.°	\xB0	&#176;	&deg;	%B0	%C2%B0	degree sign
            $(temp2).text("Temp:  " + ((((results.list[2].main.temp) - 273.15) * 1.8 + 32).toPrecision(3)) + "°F");
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            $(humidity2).text("Humidity:  " + results.list[2].main.humidity);
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            $(windSpeed2).text("WindSpeed:  " + results.list[2].wind.speed);
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            //console.log(response.coord.lat);
            //console.log(response.coord.lon);
            // uvForcast2(response.city.coord.lat, response.city.coord.lon)


            // //--------------------------------------day 3 of 5--------------------------------------------  


            $('#forcastWeather3').empty()
            // here I create the buckets for the information:
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const cityName3 = $('<h3>').appendTo('#forcastWeather3');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const date3 = $("<p>").appendTo('#forcastWeather3');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const icon3 = $('<img>').appendTo('#forcastWeather3');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const temp3 = $('<p>').appendTo('#forcastWeather3');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const humidity3 = $('<p>').appendTo('#forcastWeather3');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const windSpeed3 = $('<p>').appendTo('#forcastWeather3');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            // Here I need to capture the infromation from the response object, and place the lotion in the basket...lol it does it whenever its told...lol  for whomever is grading here is your mid-day levity....You're welcome.  object to text.....?



            //-------------------------------------------------------------------------------------------------------

            // RD  =I must search the response, to find where the attributes exhist in the object in the console, from there I need to capture the new variable, from above and add text to the buckets, in the form of key and value pairs given by the object.  

            //.text()  VThe.text () method cannot be used on form inputs or scripts. To set or get the text value of input or textarea elements, use the.val () method. To get the value of a script element, use the.html () method. As of jQuery 1.4, the.text () method returns the value of text

            //The .attr() method gets the attribute value for only the first element in the matched set. To get the value for each element individually, use a looping construct such as jQuery's .each() or .map() method.Using jQuery's .attr() method to get the value of an element's attribute has two main benefits:

            // Convenience: It can be called directly on a jQuery object and chained to other jQuery methods.
            // Cross-browser consistency: The values of some attributes are reported inconsistently across browsers, and even across versions of a single browser. The .attr() method reduces such inconsistencies.

            //------------------------------------------------------------------------------------------------------------------

            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            $(cityName3).text(results.city.name);
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            $(date3).text("Forcast Day 3:");
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.URL is http://openweathermap.org/img/wn/10d@2x.png
            $(icon3).attr('src', "http://openweathermap.org/img/wn/" + results.list[3].weather[0].icon + "@2x.png");
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.°	\xB0	&#176;	&deg;	%B0	%C2%B0	degree sign
            $(temp3).text("Temp:  " + ((((results.list[3].main.temp) - 273.15) * 1.8 + 32).toPrecision(3)) + "°F");
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            $(humidity3).text("Humidity:  " + results.list[3].main.humidity);
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            $(windSpeed3).text("WindSpeed:  " + results.list[3].wind.speed);
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            //console.log(response.coord.lat);
            //console.log(response.coord.lon);
            uvForcast3(response.city.coord.lat, response.city.coord.lon)


            // //----------------------------------------day 4 of 5--------------------------------------------


            $('#forcastWeather4').empty()
            // here I create the buckets for the information:
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const cityName4 = $('<h3>').appendTo('#forcastWeather4');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const date4 = $("<p>").appendTo('#forcastWeather4');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const icon4 = $('<img>').appendTo('#forcastWeather4');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const temp4 = $('<p>').appendTo('#forcastWeather4');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const humidity4 = $('<p>').appendTo('#forcastWeather4');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const windSpeed4 = $('<p>').appendTo('#forcastWeather4');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            // Here I need to capture the infromation from the response object, and place the lotion in the basket...lol it does it whenever its told...lol  for whomever is grading here is your mid-day levity....You're welcome.  object to text.....?



            //-------------------------------------------------------------------------------------------------------

            // RD  =I must search the response, to find where the attributes exhist in the object in the console, from there I need to capture the new variable, from above and add text to the buckets, in the form of key and value pairs given by the object.  

            //.text()  VThe.text () method cannot be used on form inputs or scripts. To set or get the text value of input or textarea elements, use the.val () method. To get the value of a script element, use the.html () method. As of jQuery 1.4, the.text () method returns the value of text

            //The .attr() method gets the attribute value for only the first element in the matched set. To get the value for each element individually, use a looping construct such as jQuery's .each() or .map() method.Using jQuery's .attr() method to get the value of an element's attribute has two main benefits:

            // Convenience: It can be called directly on a jQuery object and chained to other jQuery methods.
            // Cross-browser consistency: The values of some attributes are reported inconsistently across browsers, and even across versions of a single browser. The .attr() method reduces such inconsistencies.

            //------------------------------------------------------------------------------------------------------------------

            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            $(cityName4).text(results.city.name);
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            $(date4).text("Forcast Day 4:");
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.URL is http://openweathermap.org/img/wn/10d@2x.png
            $(icon4).attr('src', "http://openweathermap.org/img/wn/" + results.list[4].weather[0].icon + "@2x.png");
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.°	\xB0	&#176;	&deg;	%B0	%C2%B0	degree sign
            $(temp4).text("Temp:  " + ((((results.list[4].main.temp) - 273.15) * 1.8 + 32).toPrecision(3)) + "°F");
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            $(humidity4).text("Humidity:  " + results.list[4].main.humidity);
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            $(windSpeed4).text("WindSpeed:  " + results.list[4].wind.speed);
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            //console.log(response.coord.lat);
            //console.log(response.coord.lon);
            uvForcast4(response.city.coord.lat, response.city.coord.lon)

            // //-----------------------------------------------day 5 of 5-------------------------------------------------------

            $('#forcastWeather5').empty()
            // here I create the buckets for the information:
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const cityName5 = $('<h3>').appendTo('#forcastWeather5');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const date5 = $("<p>").appendTo('#forcastWeather5');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const icon5 = $('<img>').appendTo('#forcastWeather5');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const temp5 = $('<p>').appendTo('#forcastWeather5');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const humidity5 = $('<p>').appendTo('#forcastWeather5');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            const windSpeed5 = $('<p>').appendTo('#forcastWeather5');
            //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
            // Here I need to capture the infromation from the response object, and place the lotion in the basket...lol it does it whenever its told...lol  for whomever is grading here is your mid-day levity....You're welcome.  object to text.....?



            //-------------------------------------------------------------------------------------------------------

            // RD  =I must search the response, to find where the attributes exhist in the object in the console, from there I need to capture the new variable, from above and add text to the buckets, in the form of key and value pairs given by the object.  

            //.text()  VThe.text () method cannot be used on form inputs or scripts. To set or get the text value of input or textarea elements, use the.val () method. To get the value of a script element, use the.html () method. As of jQuery 1.4, the.text () method returns the value of text

            //The .attr() method gets the attribute value for only the first element in the matched set. To get the value for each element individually, use a looping construct such as jQuery's .each() or .map() method.Using jQuery's .attr() method to get the value of an element's attribute has two main benefits:

            // Convenience: It can be called directly on a jQuery object and chained to other jQuery methods.
            // Cross-browser consistency: The values of some attributes are reported inconsistently across browsers, and even across versions of a single browser. The .attr() method reduces such inconsistencies.

            //------------------------------------------------------------------------------------------------------------------

            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            $(cityName5).text(results.city.name);
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            $(date5).text("Forcast Day 5:");
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.URL is http://openweathermap.org/img/wn/10d@2x.png
            $(icon5).attr('src', "http://openweathermap.org/img/wn/" + results.list[5].weather[0].icon + "@2x.png");
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.°	\xB0	&#176;	&deg;	%B0	%C2%B0	degree sign
            $(temp5).text("Temp:  " + ((((results.list[5].main.temp) - 273.15) * 1.8 + 32).toPrecision(3)) + "°F");
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            $(humidity5).text("Humidity:  " + results.list[5].main.humidity);
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            $(windSpeed5).text("WindSpeed:  " + results.list[5].wind.speed);
            // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
            //console.log(response.coord.lat);
            //console.log(response.coord.lon);
            uvForcast5(response.city.coord.lat, response.city.coord.lon)

        })
        // RD = I am going to have to post this somehow to the html.. and prior to that, I am going to have to clear it off the board to replace
    }

});