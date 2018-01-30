
/// Starter Buttons That have the subject of Shapes
var buttons =["Lines", "Triangles", "Circles", "Squares", "Rectangles", "Ovals", "Graphs", "Oblongs", "Octogon", "Hexagon" ]; 

function createButtons(){

	///Empties the Button Area so that the buttons don't make duplicates. 
	$("#button-area").empty();

	/// For each button in the buttons array. Create a button add a class and append to button area. 
	buttons.forEach(function(el){
		var newButton = $("<button class='ui inverted teal button'>"); 
		newButton.addClass("gif-click");
		newButton.text(el);
		$("#button-area").append(newButton);
	});
}

/// Gets A Gif based on what buttonText is sent to this function, using an ajax call. 
function getGifs(buttonText){
	
	var queryURL =  "https://api.giphy.com/v1/gifs/search?q=" + buttonText + "&api_key=dc6zaTOxFJmzC&limit=10";  

	$.ajax({
	  url: queryURL,
	  method: 'GET'
	}).done(function(response) {

	  //Empties the Gif Area, so that each time the user clicks a button the gif area will 
	  //only put up new gifs. 
	  $("#gifs").empty();


	  if(response.data.length > 0){
		  ///Creates an img tag for each gif and a rating and loads them into the gif area. 
	      response.data.forEach(function(el){
	      ///Appends Rating and Image to div tag. 
	      	$("#gifs").append('<div class="column"><p> Rating: ' + el.rating + '</p><div class="img-container"><img src=' + el.images.original_still.url + ' class="gif"></div></div>');
	      });	  
	   }
	   else{
	   		///Handle Exception 
	   		console.log("Your Query Returned Nothing");
	   }

	});
}

/// Listens for the user to hit the submit button. Grabs the value from the text input, and creates a button.
$("#submit-button").on("click", function(event){
	event.preventDefault();
	//Grabs the value the user pressed and makes the button
	var	button_value = $("#input").val().trim();
	//Sets the input value to nothing. Clears the text feild. 
	$("#input").val("");
	if(button_value == ""){
		//Handle Exception 
		console.log("You Need To Type Soemthing")
	}
	else {
		buttons.push(button_value);
		createButtons(); 
	}

});

// Gets the text from the button when a user presses a button. Sends it to getGifs function. 
$("body").on("click", ".gif-click", function(){
	getGifs($(this).text());  
}); 

///Listens for Clicks on Gifs 
///If the gif is playing add _s from the src url. Remove the class of playing for the conditional.
///If the gif is still remove _s from the src url. Add a class of playing for the conditional.
$("body").on("click", ".gif", function(){
	if($(this).hasClass("playing")){
		console.log("Gonna Stop Playing");
		$(this).attr("src", $(this).attr("src").replace(/\.gif/, "_s.gif"));
		$(this).removeClass("playing");
	}
	else{
		console.log("Should Start Playing");
		$(this).attr("src", $(this).attr("src").replace(/\_s\.gif/, ".gif"));
		$(this).addClass("playing");
	}
});

///Initializes App with Initial Buttons
createButtons();