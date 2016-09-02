//Dependency jQuery.
$(function() {
    var pallete = [
        ["#FFAAAA", "#D46A6A"],
        ["#774A8E", "#9874AA"],
        ["#88CC88", "#55AA55"],
        ["#8080B3", "#565695"]
    ];

    var seedFromString = function(seed, test_name, options) {
        word = md5("" + seed + test_name)[0];
        i = Math.abs(word);
        return i;
    }

    /*
     * Function to create a new random pattern and return the dataURI.
     * Accepts: number - acts as a seed. 
     * Returns: String - DataURI
     */

    function createPattern(seed) {
        var height = 25 + seed % 25,
          	heightBy4 = height / 4,
          	theCanvas = $("<canvas width='" + height + "' height='" + height + "'>")[0],
        	theContext = theCanvas.getContext("2d"),
        	palleteItem = pallete[seed % pallete.length];

        if (seed % 2) {
            // Filled triangle
            theContext.beginPath();
            theContext.moveTo(0, 0);
            theContext.lineTo(height, 0);
            theContext.lineTo(0, height);
            theContext.fillStyle = palleteItem[0];
            theContext.fill();

            theContext.beginPath();
            theContext.moveTo(height, height);
            theContext.lineTo(height, 0);
            theContext.lineTo(0, height);
            theContext.fillStyle = palleteItem[1];
            theContext.fill();
        } else {
            //Circle Mode.
            theContext.arc(heightBy4, heightBy4, heightBy4, 0, Math.PI * 2);
            theContext.fillStyle = palleteItem[1];
            theContext.fill();

            theContext.beginPath();
            theContext.arc(height - height / 4, height - height / 4, height / 4, 0, Math.PI * 2, false);
            theContext.fillStyle = palleteItem[0];
            theContext.fill();
        }
        return theCanvas.toDataURL();
    }

    function assignRandomBG(seed) {
        $("body").css('background-image', 'url(' + createPattern(seed) + ')');
    }
  
  	$("#thebox").on("keyup", function() {
        var text = $(this).val();
        var rand = seedFromString(text);
        assignRandomBG(rand);
    });
  
    assignRandomBG(seedFromString($("#thebox").val()));
});
