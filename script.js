document.addEventListener('DOMContentLoaded',()=>{
    //select the elements
    const textToTypeElement = document.getElementById('text-to-type');
    const typingInputElement = document.getElementById('typing-input');
    const speedElement = document.getElementById("speed");
    const accuracyElement = document.getElementById("accuracy");
    console.log({
        textToTypeElement,
        typingInputElement,
        speedElement,
        accuracyElement,
    });
    //text to display
    const sampleTexts = ["Tomorrow early morning first I go to walk",
                        "The vegetables are greener after the rain",
                        "The rabbits eat the vegetables in the garden in the early morning",
                        "They have a different background.Accordingly we have the right to different futures","If I had to choose, I would say that my favourite fruit is peach"];
    //initial values
    let currentIndex = 0;
    let startTime = new Date();
    let errors = 0;

    //Function to initialize or restart the game
    function initializeGame(){
        const text = sampleTexts[Math.floor(Math.random()*sampleTexts.length)];
        textToTypeElement.textContent = text;
        typingInputElement.value = "";
        currentIndex = 0;
        startTime = new Date();
        errors = 0;
        //update fn
        updateFeedback();
    }
    //Function to update the speed and the accuracy feedback
    function updateFeedback(){
        const currentTime = new Date();
        const elapsedTime = (currentTime-startTime)/60000;
        if(elapsedTime<=0){
            speedElement.textContent=0;
        }else{
            const wordsTyped = typingInputElement.value.trim().split(/\s+/).length;
            const speed = Math.round(wordsTyped/elapsedTime);
            speedElement.textContent = speed;
        }
        //calculate accuracy
        const accuracy = currentIndex > 0 ? Math.round(((currentIndex-errors)/currentIndex)*100) : 100;
        accuracyElement.textContent = accuracy;
    }
    //Function to check typed character
    function checkCharacter(inputChar, targetChar){
        if(inputChar !== targetChar){
            errors++;
            //play the error sound
            new Audio("/error.mp3").play();
            return false;
        }else{
            return true;
        }
    }
    //Function to display messages to the user
    function displayMessage(message){
        const messageArea = document.getElementById("message-area");
        messageArea.textContent = message;
        //clear the  msg after 3s
        setTimeout(()=>{
            messageArea.textContent="";
        },3000);
    }
    //Event listener to typing input
    typingInputElement.addEventListener('input',(e)=>{
        const typedText = typingInputElement.value;
        const targetText = textToTypeElement.textContent;
        if(currentIndex<targetText.length){
            const isCorrect = checkCharacter(typedText[currentIndex],targetText[currentIndex]);
            textToTypeElement.innerHTML = targetText.substring(0,currentIndex)+`<span class='${isCorrect ? 'correct' : 'incorrect'}'>${targetText[currentIndex]}</span>`+targetText.substring(currentIndex+1);
            currentIndex++;
            if(currentIndex === targetText.length){
                displayMessage('Text completed starting a new one.');
                initializeGame();
            }
        }
        //update the feedback
        updateFeedback();
    })
    //Start the game
    initializeGame();
})