function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({ scope: "https://www.googleapis.com/auth/youtube.force-ssl" })
        .then(function () { console.log("Sign-in successful"); },
            function (err) { console.error("Error signing in", err); });
}
function loadClient() {
    gapi.client.setApiKey("AIzaSyC5CeFTH7lLW85E-j7_2QKz2WQh2SSNVek");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function () { console.log("GAPI client loaded for API"); },
            function (err) { console.error("Error loading GAPI client for API", err); });
}
// Make sure the client is loaded and sign-in is complete before calling this method.
// <script src = " https;// ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js">
$(document).ready(function () {

    const apiKey = 'AIzaSyC5CeFTH7lLW85E-j7_2QKz2WQh2SSNVek';
    const clientId = '70988659619-j4r3qttpnb8289mcpdrhsakbgct3tnl0.apps.googleusercontent.com';




    // $('#search').keypress(function () {
    //     console.log("I hear ya")
    //     if (event.keyCode === 13) {
    //         const song = $('#search').val();
    //         console.log(song);
    //         localStorage.setItem('song', song);


    //         $('#searchButton').val('');
    //     }

    // })


    $('#searchArea').on('submit', function (event) {
        console.log("click");
        event.preventDefault()
        let song = $('#search').val();
        let artist = $('#artist').val();

        console.log(song, "I hear your song");
        console.log(artist, 'I hear the artist');

        execute(song, artist);
        lyrics(song, artist);
        artWork(artist);


        const songS = $('<h3>').appendTo('#songTitle');
        songS.text('Song Title: ' + song);

        const artistS = $('<h3>').appendTo('#artistName');
        artistS.text('Artist Name: ' + artist);




        $('#search').val('');
        $('#artist').val('');
    })
    // const searches = document.getElementById('search');
    // searches.onkeypress(function () {
    //     console.log('Anthony')
    // })
    // document.getElementById('search').onkeypress(function () {
    //     console.log(" look another click")
    // })


})
function execute(song, artist) {
    return gapi.client.youtube.search.list({
        "part": [
            "snippet"
        ],
        "q": [song, artist],
        "type": "video",
        "videoEmbeddable": "true",
        "maxResults": 1
    })
        .then(function (response) {
            // Handle the results here (response.result has the parsed body).
            console.log("Response", response);

            const iframe = $('#existing-iframe-example')
            iframe.attr('src', "https://www.youtube.com/embed/" + response.result.items[0].id.videoId + "?enablejsapi=1");
        },
            function (err) { console.error("Execute error", err); });

}
gapi.load("client:auth2", function () {
    gapi.auth2.init({ client_id: "70988659619-j4r3qttpnb8289mcpdrhsakbgct3tnl0.apps.googleusercontent.com" });
});

/*videoEmbeddable	string The videoEmbeddable parameter lets you to restrict a search to only videos that can be embedded into a webpage. If you specify a value for this parameter, you must also set the type parameter's value to video.
// "maxResults": 1, // default is 5 parameter must be a number between 0-50
Acceptable values are: any – Return all videos, embeddable or not true – Only retrieve embeddable videos.*/
//"videoType": "any"
const lyrics = function (song, artist) {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://mourits-lyrics.p.rapidapi.com/?a=" + artist + "&s=" + song,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "mourits-lyrics.p.rapidapi.com",
            "x-rapidapi-key": "1a30d91b2bmsh674aa11a828914dp11904ajsn789605f36de1"
        }
    }
    $.ajax(settings).done(function (response) {
        console.log(response);

        const pastelyrics = $('#songlyrics');
        pastelyrics.text(response.result.lyrics);
        //  const words =
    })
}

const artWork = function (artist) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://lastfmdimashirokovv1.p.rapidapi.com/seachArtist",
        "method": "POST",
        "headers": {
            "x-rapidapi-host": "LastFmdimashirokovV1.p.rapidapi.com",
            "x-rapidapi-key": "1a30d91b2bmsh674aa11a828914dp11904ajsn789605f36de1",
            "content-type": "application/x-www-form-urlencoded"
        },
        "data": { artist }
    }
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}







