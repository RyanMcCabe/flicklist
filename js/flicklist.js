

var model = {
  watchlistItems: [],
  browseItems: []
};


var api = {
  root: "https://api.themoviedb.org/3",
  token: "597cf5d3817e53de114553f2465fc429"
};


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function(response) {
			console.log("We got a response from The Movie DB!");
			console.log(response);

			// update the model, setting its .browseItems property equal to the movies we recieved in the response
			model.browseItems = response.results;
			// invoke the callback function that was passed in. 
			callback();
		}
	});
  
}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {

  $("#section-watchlist").children("ul").empty();
  $("#section-browse").children("ul").empty();

  // for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section
  model.watchlistItems.forEach(function(movie){
      var watchSelector = $("#section-watchlist").children("ul");
      var watchElement = "<li>" + movie.title + "</li>";
      watchSelector.append(watchElement);
  });
  // for each movie on the current browse list, 
  model.browseItems.forEach(function(movie) {
	// insert a list item into the <ul> in the browse section
    var element = "<li>" + movie.title +"</li>";
	var browseSelector = $("#section-browse").children("ul");
	browseSelector.append(element);

	// the list item should include a button that says "Add to Watchlist"
	var button = document.createElement("input");
    button.type = "button";
    button.value = "Add to wishlist";
    browseSelector.append(button);

	// when the button is clicked, this movie should be added to the model's watchlist and render() should be called again
    button.onclick = function(){
        model.watchlistItems.push(movie);
        render();
    }
  });
  
}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});

