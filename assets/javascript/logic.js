// Intial array
      var reactions =["Happy", "Sad", "Excited", "Confused"];

      // Array for still images
      var stillImage = [];

      // Array for moving images
      var movingImage =[];

    console.log(reactions);

    // Function to create buttons
    function renderButtons() {

      // Makes new button
      $("#buttons-view").empty();
      for (var i=0; i < reactions.length; i++){
        var newButton = $("<button>");
        newButton.text(reactions[i]);
        newButton.attr("data-name", reactions[i]);
        newButton.addClass("reaction");
        $("#buttons-view").append(newButton);
      };

    $(".reaction").click(function(){

      // Empties arrays so that only the URLs for the chosen button are in it

      stillImage = [];
      movingImage = [];

      // Empties gifs once new button is clicked
      $("#gifs-view").empty();

      // GIPHY API
      var reaction = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + reaction + "&api_key=dc6zaTOxFJmzC&limit=10"

      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response){

        console.log(response);
        console.log(queryURL);

        for (var i=0; i<10; i++){

          // Puts the correct images in the respective array
          movingImage.push(response.data[i].images.fixed_height.url);
          stillImage.push(response.data[i].images.fixed_height_still.url);

          // console.log(movingImage);
          // console.log(stillImage);

          // Creating the div and places for the rating and gif to go
          var newDiv = $("<div>");
          newDiv.addClass("gifDiv");

          var rating = $("<p>");
          rating.text(response.data[i].rating);
          console.log(response.data[i].rating);

          var newGif = $("<img>");

          newGif.attr("data-number", i)
          newGif.attr("src", response.data[i].images.fixed_height_still.url);

          newDiv.append(rating);
          newDiv.append(newGif);

          $("#gifs-view").append(newDiv);

          // Create the stop and start action
          newGif.click(function(){
            // if the src is equal to the stillURL then it is changed to the movingURL once clicked
            if ( $(this).attr("src") == stillImage[$(this).attr("data-number")] ) { 
              $(this).attr("src", movingImage[$(this).attr("data-number")])
          }else {
            $(this).attr("src", stillImage[$(this).attr("data-number")]);
          };

          });
        };
      });


    });
    };

    // Calling the function to render the buttons
    renderButtons();

    // Adding the click function to take the value of the input
    // and then add a button from that value
    $("#add-buttons").click(function(){
      event.preventDefault();
      var buttonInput = $("#buttons-input").val();
      $("#buttons-input").val("");
      reactions.push(buttonInput);
      renderButtons();
    });