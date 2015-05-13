var omdb_url = 'http://www.omdbapi.com/?';
var $movieSearch = $('.search-form');
var $searchBar = $('input[name=search]')[0];
var FIREBASE_URL = "https://movie-time.firebaseio.com/movie-time.json";
var $movieDetails = $(".movie-info-display");

$movieSearch.on('submit', function() {
  var movie = $searchBar.value;
  var URL = omdb_url + "t=" + movie + "&r=json";
  console.log(URL);
  $.get(URL, function(data) {
    addMovieDetail(data);
  })
  return false;
})

function addMovieDetail(data) {
  var $target = $(".movie-detail");
  var $targetPoster = $(".movie-poster");

  if (data.Title === undefined) {
    $target.empty();
    $target.append("<h2>Sorry friend, that's not a movie!</h2>");
  } else {
    var poster = data.Poster === "N/A" ? "http://i.imgur.com/rXuQiCm.jpg?1" : data.Poster;
    $target.empty();
    $targetPoster.empty();
    $targetPoster.append("<img src=" + poster + "></img>");
    $target.append("<h2 class='h2 movie-title'>" + data.Title + "</h2>");
    $target.append("<h3>" + data.Year + "</h3>");
    $target.append("<h3>" + "Rated: " + data.Rated + "</h3>");
    $target.append("<p>" + data.Plot + "</p>");
    $target.append("<input class='btn btn-default watch-button' type='submit' value='Add Movie to List'></input>"); 

	}
}
 
$movieDetails.on('click', '.watch-button', function() {
	console.log("hello!!!");
  var movie = $searchBar.value;
  var url = omdb_url + "t=" + movie + "&r=json";
  $.get(url, function (data) {
    $.post(FIREBASE_URL, JSON.stringify(data));
    addTableDetail(data);
    }, 'jsonp');
 });

    // var $addBtn = $(".watch-button");

    // $addBtn.click(function() {
    //   var movie = $searchBar.value;
    //   var url = omdb_URL + "t=" + movie + "&r=json";
    //   console.log("is this on?");
    //   $.get(url, function (data) {
    //     $.post(FIREBASE_URL, JSON.stringify(data));
    //     addTableDetail(data);
    // }, 'jsonp');

 	// 	var $addBtn = $('.watch-button');
 	// 	$addBtn.click(function(){
	// console.log("hello????")
	// addTableDetail(data);
	// })


function addTableDetail(data){
  var $table = $("table");
  $table.append("<tr></tr>");
  var $target = $("tr:last");
  var poster = data.Poster === "N/A" ? "http://i.imgur.com/rXuQiCm.jpg?1" : data.Poster;
  $target.append("<td><img src=" + poster + "></img></td>");
  $target.append("<td class='movie-title'>"+ data.Title +"</td>");
  $target.append("<td>"+ data.Year +"</td>");
  $target.append("<td>"+ data.imdbRating +"</td>");
  $target.append("<button class='btn btn-success'>"+ "&#10003" +"</button>");
}