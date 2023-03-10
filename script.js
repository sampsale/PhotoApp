

$(document).ready(function () {
    
    // variables for current image data 
    let imageUrl
    let imageCaption
    let imageTimestamp

    // URL for backend API
    // const backend_url = "https://vuosipelibackend-1-w9912448.deta.app/"
    
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
        $('.slider-container').show();
        // Init the game variables
        points = 0
        counter = 0

        // Reset explanation and point divs
        $('.score-container').find('.explanation').text('');
        $('.score-container').find('.timestamp').html("<p>Pisteet: " + points+"</p>");

        // Load the image data from the JSON file
        $.getJSON('images/images.json', function (data) {
            data = data.images
            // Shuffle the data array
            const shuffled = data.sort(() => 0.5 - Math.random());
            // Selected first two elements from shuffled array
            selected = shuffled.slice(0, game_rounds);

            $('.score-container').find('.caption').text(points);
            displayImage()

        });

    }

    // Check if the selected year is correct and count points
    function checkPoints() {

        let howfar = Math.abs($("#year-selector").val() - imageTimestamp)
        let message = ''
        if (howfar === 0) {
            points += 3
            message = 'Täysin oikein!'
        } else if (howfar <= 10) {
            points += 2
            message = 'Aika lähellä! Arvauksesi oli ' + howfar + ' vuoden päässä.'
        } else if (howfar <= 20) {
            points += 1
            message = 'Lähellä! Arvauksesi oli ' + howfar + ' vuoden päässä.'
        } else {
            points += 0
            message = 'Nyt meni mönkään... Arvauksesi oli ' + howfar + ' vuoden päässä.'
        }

        console.log(message)
        $('.score-container').find('.explanation').html("<p>" + message + "</p>");
        // Deduce points accordingly 
        // points += points - (Math.abs($("#year-selector").val() - imageTimestamp))
        // If not last pic, display points. Else hide nextround and show finishgame
        if (counter < selected.length - 1) {
            displayPoints(message)

        } else {
            displayPoints(message)
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
        $('.endgame-container').html('<p>Lopullinen pistemääräsi on ' + points + '.</p>');
    }

    // Display the points after each round and give info about the last image
    function displayPoints(message) {
        $('.score-container').find('.explanation').html("<p>" + message + "</p> <p> Selite: <b>" + imageCaption+"</b> Vuosi: <b>"+ imageTimestamp+"</b></p>");
        $('.score-container').find('.timestamp').html("<p>Pisteet: " + points+"</p>");
        $('#nextround').show();
    }


    // Display the image and caption
    function displayImage() {
        imageUrl = selected[counter].src;
        imageTimestamp = selected[counter].timestamp;
        imageCaption = selected[counter].caption;
        // Set the image in the HTML
        $('.image-container').find('img').attr('src', imageUrl);

    }

    // Button listener for next round
    $("#nextround").click(function () {
        $('.slider-container').show();
        $('.score-container').find('.explanation').text('');
        counter++
        displayImage()
        $('#nextround').hide();
        $('#submit').show();

    });

    // Button listener for submit
    $("#submit").click(function () {
        $('#submit').hide();
        $('.slider-container').hide();
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

