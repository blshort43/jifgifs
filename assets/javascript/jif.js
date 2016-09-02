var topicArray = ["Jif", "Gif", "Cookies", "Deal With It", "Can't Handle My Swag", "Falling",
    "Party Hard", "Super Mario", "LOL", "Mashup", "Timelapse", "Slapping", "Slow Mo",
    "Weird", "8 Bit", "MacGyver", "MacGruber", "Carlton Bling"
];


window.onload = function() {
    $("#buttonContainer, .row2").hide();

};

$(".btn-primary").click(function() {
    $("#buttonContainer, .row2").show();
    $("#title").remove();
});

function displayGifs() {

    $("#gifView").empty();

    var topic = $(this).attr("name")
    console.log(topic);
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";

    $.ajax({ url: queryURL, method: 'GET' })
        .done(function(response) {
            console.log(response);

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                //gif container
                var gifDiv = $("<div>");
                gifDiv.addClass("gifDiv");

                //rating variable
                var rating = response.rating;

                //rating <p>
                var ratingP = $("<p>").text("Rating: " + results[i].rating);

                //display rating
                gifDiv.append(ratingP);

                //display gif
                var gifImage = $("<img>").attr('src', results[i].images.fixed_height.url);

                gifDiv.append(gifImage);

                $('#gifView').append(gifDiv);
            };
        });
};

//create gif buttons
function createButtons() {
    for (var i = 0; i < topicArray.length; i++) {
        var button = $("<button>");
        button.addClass("topicName");
        button.attr("name", topicArray[i]);
        button.text(topicArray[i]);
        $("#buttonContainer").append(button);
    };
};

$(".submit").click(function() {
    if (!$('.jifInput').val()) {

    } else {
        $("#buttonContainer").empty();
        var newGif = $(".jifInput").val().trim();
        topicArray.push(newGif);
        createButtons();
        $(".jifInput").val("");
        return false;
    }
});


$(document).on("click", ".topicName", displayGifs)

createButtons();
