/*
    Cistercians numbers are made from 12 points joined by lines and can show numbers from 1 to 9999
    The vertical line in the center is always there. 
    The area should be divided in four quarters:
    The right top is for units
    The left top is for tens
    The right bottom is for hundreds
    The left bottom is for thousands

        Example: "10" is written like a reversed "L"
                        1----2****3
                        *****|*****
                        4****5****6
                        *****|*****
                        7****8****9
                        *****|*****
                        10***11**12
    An explanation with more examples can be found here: https://en.wikipedia.org/wiki/The_Ciphers_of_the_Monks
*/
const CANVAS_AREA = document.getElementById('canvas_area');
const CTX = CANVAS_AREA.getContext('2d');
const REFERENCE_WIDTH = CANVAS_AREA.width;
const REFERENCE_HEIGHT = CANVAS_AREA.height;
let color_lines = "rgba(255, 215, 0,0.9)";
const INPUT_NUMBER = document.querySelector('[name="number_to_convert"]');

/*
    the array LIST_DOTS give the coordinates of the 12 points in the canvas
*/

const LIST_DOTS = {
    "dot1": [0,0],
    "dot2": [REFERENCE_WIDTH/2, 0],
    "dot3": [REFERENCE_WIDTH, 0],
    "dot4": [0, (REFERENCE_HEIGHT/6)*2],
    "dot5": [REFERENCE_WIDTH/2, (REFERENCE_HEIGHT/6)*2],
    "dot6": [REFERENCE_WIDTH, (REFERENCE_HEIGHT/6)*2],
    "dot7": [0, (REFERENCE_HEIGHT/6)*4],
    "dot8": [REFERENCE_WIDTH/2, (REFERENCE_HEIGHT/6)*4],
    "dot9": [REFERENCE_WIDTH, (REFERENCE_HEIGHT/6)*4],
    "dot10": [0, REFERENCE_HEIGHT],
    "dot11": [REFERENCE_WIDTH/2, REFERENCE_HEIGHT],
    "dot12": [REFERENCE_WIDTH, REFERENCE_HEIGHT],
};

/**
 * Canvas function: draws the vertical line in the center of the canvas 
 */
function drawVerticalMiddleLine(){
    CTX.moveTo(LIST_DOTS.dot2[0], LIST_DOTS.dot2[1]);
    CTX.lineTo(LIST_DOTS.dot11[0], LIST_DOTS.dot11[1]);
    CTX.strokeStyle = color_lines;
    CTX.filter = 'blur(1.5px)';
    CTX.lineWidth = 5;
    CTX.stroke();
}

/**
 * Canvas function: interpret the number and send each figure from this number
 * to the drawNumber function with the right dataset of coordinates
 * received 1 parameter: the number that should be translated in cistercian
 * @param {string} number_to_translate 
 */
function drawInCistercian(number_to_translate){

    CTX.clearRect(0, 0, CANVAS_AREA.width, CANVAS_AREA.height);
    CTX.beginPath();

    drawVerticalMiddleLine();

    const TAB_FOR_UNITS = [LIST_DOTS.dot2, LIST_DOTS.dot3, LIST_DOTS.dot5, LIST_DOTS.dot6];
    const TAB_FOR_TENS = [LIST_DOTS.dot2, LIST_DOTS.dot1, LIST_DOTS.dot5, LIST_DOTS.dot4];
    const TAB_FOR_HUNDREDS = [LIST_DOTS.dot11, LIST_DOTS.dot12, LIST_DOTS.dot8, LIST_DOTS.dot9];
    const TAB_FOR_THOUSANDS = [LIST_DOTS.dot11, LIST_DOTS.dot10, LIST_DOTS.dot8, LIST_DOTS.dot7];

    drawNumber(number_to_translate%10, TAB_FOR_UNITS);
    if(number_to_translate>=10){
        drawNumber(parseInt(number_to_translate/10)%10, TAB_FOR_TENS);
    }
    if(number_to_translate>=100){
        drawNumber(parseInt(number_to_translate/100)%10, TAB_FOR_HUNDREDS);
    }
    if(number_to_translate>=1000){
        drawNumber(parseInt(number_to_translate/1000)%10, TAB_FOR_THOUSANDS);
    }
}

/**
 * drawNumber (canvas function): draws the figure in the right area of the canvas,
 * receives 2 parameters: one is the figure (figure), the other (dataSet) is an array with the coordinates of the points 
 * in the quarter where the cistercian figure should be displayed.
 * @param {number} figure 
 * @param {array} dataSet 
 */
function drawNumber(figure, dataSet){
    switch(figure){
        case 1:
            CTX.moveTo(dataSet[0][0], dataSet[0][1]);
            CTX.lineTo(dataSet[1][0], dataSet[1][1]);
            break;
        case 2:
            CTX.moveTo(dataSet[2][0], dataSet[2][1]);
            CTX.lineTo(dataSet[3][0], dataSet[3][1]);
            break;
        case 3:
            CTX.moveTo(dataSet[0][0], dataSet[0][1]);
            CTX.lineTo(dataSet[3][0], dataSet[3][1]);
            break;
        case 4:
            CTX.moveTo(dataSet[2][0], dataSet[2][1]);
            CTX.lineTo(dataSet[1][0], dataSet[1][1]);
            break;
        case 5:
            CTX.moveTo(dataSet[2][0], dataSet[2][1]);
            CTX.lineTo(dataSet[1][0], dataSet[1][1]);

            CTX.moveTo(dataSet[0][0], dataSet[0][1]);
            CTX.lineTo(dataSet[1][0], dataSet[1][1]);
            break;
        case 6:
            CTX.moveTo(dataSet[1][0], dataSet[1][1]);
            CTX.lineTo(dataSet[3][0], dataSet[3][1]);
            break;
        case 7:
            CTX.moveTo(dataSet[0][0], dataSet[0][1]);
            CTX.lineTo(dataSet[1][0], dataSet[1][1]);

            CTX.moveTo(dataSet[1][0], dataSet[1][1]);
            CTX.lineTo(dataSet[3][0], dataSet[3][1]);
            break;
        case 8:
            CTX.moveTo(dataSet[2][0], dataSet[2][1]);
            CTX.lineTo(dataSet[3][0], dataSet[3][1]);

            CTX.moveTo(dataSet[1][0], dataSet[1][1]);
            CTX.lineTo(dataSet[3][0], dataSet[3][1]);
            break;
        case 9:
            CTX.moveTo(dataSet[0][0], dataSet[0][1]);
            CTX.lineTo(dataSet[1][0], dataSet[1][1]);

            CTX.moveTo(dataSet[2][0], dataSet[2][1]);
            CTX.lineTo(dataSet[3][0], dataSet[3][1]);

            CTX.moveTo(dataSet[1][0], dataSet[1][1]);
            CTX.lineTo(dataSet[3][0], dataSet[3][1]);
            break;
    }

    CTX.filter = 'blur(1.5px)';
    CTX.strokeStyle = color_lines;
    CTX.lineWidth = 5;
    CTX.stroke();
}

function checkNumber(number_to_translate){
    console.log('first number_to_translate', number_to_translate);
    let timeout = null;
    if(number_to_translate === number_to_translate && number_to_translate>=0 && number_to_translate<10000) {
        clearTimeout(timeout);

        // Make a new timeout set to go off in 1000ms (1 second)
        timeout = setTimeout(function () {
            drawInCistercian(number_to_translate);
        }, 500);
    }
    else if(number_to_translate != number_to_translate){
        console.log('dans le else if');
        console.log('number_to_translate', number_to_translate);
        CTX.clearRect(0, 0, CANVAS_AREA.width, CANVAS_AREA.height);

        timeout = setTimeout(function () {
            INPUT_NUMBER.value = "";
        }, 500);
    }
    else {
        let arrayNumber = Array.from(String(INPUT_NUMBER.value), Number);
        slicedArray = arrayNumber.slice(0,4);
        numberShorten = slicedArray.join("");
        INPUT_NUMBER.value = numberShorten;
        checkNumber(numberShorten);
    }
}

INPUT_NUMBER.value = "";

INPUT_NUMBER.addEventListener('keyup', function(){

    let number_to_translate = parseInt(INPUT_NUMBER.value);
    CTX.clearRect(0, 0, CANVAS_AREA.width, CANVAS_AREA.height);

    checkNumber(number_to_translate);
})
