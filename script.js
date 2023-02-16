
// Create the year options
$(document).ready(function () {
    
    // variables to current control image data 
    let imageUrl
    let imageCaption
    let imageTimestamp
    // Points variable
    let points
    // Counter to count how many rounds 
    let counter
    // Array of selected variables
    let selected
    // Amount of game rounds
    const game_rounds = 3
    // Hide and show the appropriate elements
    $('.game-container').hide();
    $('.endgame-container').hide();
    $('#nextround').hide();
    // Display value for slider
    const value = document.querySelector("#value")
    const input = document.querySelector("#year-selector")
    value.textContent = input.value
    input.addEventListener("input", (event) => {
        value.textContent = event.target.value
    })

    // Start a new game
    function initGame() {

        // Hide and show the appropriate elements
        $('#startgame').hide();
        $('.endgame-container').hide();
        $('#nextround').hide();
        $('#submit').show();
        $('.game-container').show();
        $('#finishgame').hide();
        // Init the game variables
        points = 0
        counter = 0

        // Reset explanation and point divs
        $('.image-container').find('.explanation').text('');
        $('.image-container').find('.timestamp').text("Pisteet: " + points);

        // Load the image data from the JSON file
        $.getJSON('images/images.json', function (data) {
            data = data.images
            // Shuffle the data array
            const shuffled = data.sort(() => 0.5 - Math.random());
            // Selected first two elements from shuffled array
            selected = shuffled.slice(0, game_rounds);

            $('.image-container').find('.caption').text(points);
            displayImage()

        });
    }

    // Check if the selected year is correct and count points
    function checkPoints() {

        // Deduce points accordingly 
        points += 100 - (Math.abs($("#year-selector").val() - imageTimestamp))
        // If not last pic, display points. Else hide nextround and show finishgame
        if (counter < selected.length - 1) {
            displayPoints()

        } else {
            displayPoints()
            $('#finishgame').show();
            $('#nextround').hide();
        }
    }


    // When game ends, show and hide appropriate containers
    function finishGame() {
        selected = []
        $('.game-container').hide();
        $('#startgame').show();
        $('.endgame-container').show();
        $('.endgame-container').text('Lopullinen pistemääräsi on ' + points + '.');
    }

    // Display the points after each round and give info about the last image
    function displayPoints() {
        $('.image-container').find('.explanation').html("<p>Selite: <b>" + imageCaption+"</b></p>");
        $('.image-container').find('.timestamp').html("<p>Pisteet: " + points+"</p>");
        $('#nextround').show();
    }


    // Display the image and caption
    function displayImage() {
        imageUrl = selected[counter].src;
        imageTimestamp = selected[counter].timestamp;
        imageCaption = selected[counter].caption;
        // Set the image and captions in the HTML
        $('.image-container').find('img').attr('src', imageUrl);

    }

    // Button listener for next round
    $("#nextround").click(function () {
        $('.image-container').find('.explanation').text('');
        counter++
        displayImage()
        $('#nextround').hide();
        $('#submit').show();

    });

    // Button listener for submit
    $("#submit").click(function () {
        $('#submit').hide();
        checkPoints()
    });

    // Button listener for startgame
    $("#startgame").click(function () {
        initGame()
    });

    // Button listener for finish game
    $("#finishgame").click(function () {
        finishGame()
    });
});

