//transform the array into buttons
$(document).ready(function() {  
    var pokemon = ["Pikachu", "Snorlax", "Squirtle", "Charmander", "Venusaur", "Dragonite", "Togepi", "Charizard", "Jigglypuff"];
    // $("#my_audio").get(0).play();
    function renderButtons() {
    
    //if you don't empty, when you add a new button it will repeat all old buttons.
    $("#pokemon-view").empty();
  
    for (var i = 0; i < pokemon.length; i++) {
        var addedButtonContent = $("<button>");
        addedButtonContent.addClass("poke btn btn-warning");
        addedButtonContent.attr("data-name", pokemon[i]);
        addedButtonContent.text(pokemon[i]);
    $("#pokemon-view").append(addedButtonContent);
    }
  }

  //call the function to transform the array into individual buttons
  renderButtons();

  // add a new button as long as the input isn't blank
  $(document).on("click", "#add-poke", function() {
//   event.preventDefault();  lines 36 and 38 are alternatives to this
  if ($('#poke-input').val().trim() === ''){
      alert("You forgot a poke!");
      }
  else {
  var poke = $("#poke-input").val().trim();
  pokemon.push(poke);
  $('#poke-input').val('');
  renderButtons();
  return false;
  }
  });
  
  ///////////////////// function to pull gifs & pause/animate them
  /// $(".poke").on("click", function() { leads to the new buttons breaking the page
  $(document).on("click", ".poke", function() {
      
    var newPoke = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newPoke + "&api_key=dc6zaTOxFJmzC&limit=10";
  
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
      var results = response.data;
        // Looping over every result item
        for (var i = 0; i < results.length; i++) {
  
          var gifDiv = $("<div>");
          // gifDiv.addClass("myGifs");
          var gifPlaying = results[i].images.fixed_height.url;
          var gifPaused = results[i].images.fixed_height_still.url;
  
          // rating
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
  
          // Creating an image tag with pause and play links connected
          // var pokeImage = $('<img>').attr("src", gifPlaying).attr('data-still', gifPaused).attr('data-animate', gifPlaying);
          var pokeImage = $("<img>").attr("src", gifPaused).attr("data-animate", gifPlaying).attr("data-still", gifPaused);
          pokeImage.attr('data-state', 'still');
          $('#gifs-appear-here').prepend(pokeImage);
          pokeImage.on('click', playGifs); 
  
        //   pokeImage = `<div class="col-md-4">` + pokeImage + `</div>`; 
          gifDiv.append(p);
        
          $("#gifs-appear-here").prepend(gifDiv);
              }
          });
      });
  
  // play and pause gifs on click
  function playGifs() {
    var state = $(this).attr("data-state");
      if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
      } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
      }
    };
  });