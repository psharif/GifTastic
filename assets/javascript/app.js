
var buttons =[]; 
 
function getGifs(buttonText){
	
	var queryURL =  "http://api.giphy.com/v1/gifs/search?q=" + buttonText + "&api_key=dc6zaTOxFJmzC&limit=10";  

	$.ajax({
	  url: queryURL,
	  method: 'GET'
	}).done(function(response) {

	  //Empties the Gif Area, so that each time the user clicks a button the gif area will 
	  //only put up new gifs. 
	  $("#gifs").empty();

	  ///Creates an img tag for each gif and loads them into the gif area. 
      response.data.forEach(function(el){
      	var newImg = $("<img>");
      	newImg.attr("src", el.images.original_still.url);
      	//newImg.attr("data-url", el.images.original_still.url);
      	newImg.addClass("gif");
      	$("#gifs").append(newImg);
      });	  

	});
}

$("#submit-button").on("click", function(event){
	event.preventDefault();
	//Grabs the value the user pressed and makes the button
	var	button_value = $("#input").val();
	var newButton = $("<button>"); 
	newButton.addClass("gif-click");
	newButton.text(button_value);
	//Appends the button to the button area. 
	$("#button-area").append(newButton);
});

$("body").on("click", ".gif-click", function(){
	getGifs($(this).text());  
}); 

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
})