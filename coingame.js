// Define variables to track game state
let balance = 100; // Starting balance
let originalBet = 0; // stores first bet
let betSize = 1; // Bet size, initially set to 1
let selectedOutcome = ''; // Initialize selected outcome
let multiplier = 0; // initialize multiplier
let isFlipping = false; // Animation state

// Function to place a bet
function placeBet() {
    // Get the bet size from the input field
    betSize = parseInt(document.getElementById('bet-size').value);

    // Check if the bet size is valid
    if (betSize <= 0 || isNaN(betSize)) {
        document.getElementById('status').innerText = "Please enter a valid bet size.";
        return;
    }

    // Check if the bet amount exceeds the available balance
    if (betSize > balance) {
        document.getElementById('status').innerText = "You don't have enough balance to place this bet.";
        return;
    }

    originalBet = betSize;
    balance -= originalBet;
    // Update UI with new balance
    document.getElementById('balance').innerText = balance;
    multiplier = 1;
    document.getElementById('multi').innerText = multiplier; // Update multiplier if win

    // Disable the bet input field and buttons
    document.getElementById('bet-size').disabled = true;
    document.getElementById('half-bet').style.display = 'none';
    document.getElementById('double-bet').style.display = 'none';

    // Hide the place bet button and show outcome selection
    document.getElementById('place-bet').style.display = 'none';
    document.getElementById('bet-selection').style.display = 'block';
    document.getElementById('cash-out').style.display = 'none';

    // Update the status message
    document.getElementById('status').innerText = "Select Heads or Tails.";
    document.getElementById('status').className = ''; // Remove any status classes
}

function selectOutcome(outcome) {
    // Store the selected outcome
    selectedOutcome = outcome;

    // Hide outcome selection
    document.getElementById('bet-selection').style.display = 'none';

    // Call flipCoin to flip the coin
    flipCoin(selectedOutcome);

    // Update the status message to indicate flipping is in progress
    document.getElementById('status').innerText = "Flipping the coin...";
}

function flipCoin(selectedOutcome) {
    const coinElement = document.getElementById('coin');
    const flipResult = Math.floor(Math.random() * 2);
    coinElement.classList.remove('heads', 'tails');
    let statusElement = document.getElementById('status');
    setTimeout(function() {
        if (flipResult === 0) {
            coinElement.classList.add('heads');
            result = 'heads';
            console.log('it is head');
        } else {
            coinElement.classList.add('tails');
            result = 'tails';
            console.log('it is tails');
        }

        // Delay for displaying the result
        setTimeout(function() {
            // Perform specific instructions based on the result
            if (result === selectedOutcome) {
                // Instructions for matching outcome
                console.log('Outcome matched!');
                betSize *= 2; // Double the bet size for the next bet
                multiplier *= 2; // Update the multiplier

                statusElement.innerHTML = '<span class="win">You win!</span> Keep going or cash out?';
                statusElement.classList.remove('lose');

                document.getElementById('multi').innerText = multiplier; // Update multiplier if win
                document.getElementById('bet-size').value = betSize; // Update the input field with the new bet size
                document.getElementById('cash-out').style.display = 'inline-block'; // Show cash out button

                // Keep the heads and tails buttons visible
                document.getElementById('bet-selection').style.display = 'block';

            } else {
                // Instructions for non-matching outcome
                console.log('Outcome not matched!');
                betSize = originalBet; // Reset the bet size to 1

                statusElement.innerHTML = '<span class="lose">You lose!</span> want to place another bet?';
                statusElement.classList.remove('win');

                document.getElementById('bet-size').value = originalBet; // Sets bet back to original bet
                document.getElementById('multi').innerText = 0; // Update multiplier to 0 if lose or cashout
                document.getElementById('place-bet').style.display = 'inline-block'; // Show the place bet button again
                document.getElementById('bet-selection').style.display = 'none'; // Hide outcome selection

                // Enable the bet input field and buttons
                document.getElementById('bet-size').disabled = false;
                document.getElementById('half-bet').style.display = 'inline-block';
                document.getElementById('double-bet').style.display = 'inline-block';
            }
        }, 3000); // Adjust the delay duration here (3000 milliseconds in this example)
    }, 100); // Original delay for flipping the coin
}

// Function to handle cash out
function cashOut() {
    // Add the current bet size to the balance if it's a win
    balance += multiplier * originalBet;

    // Update UI with new balance
    document.getElementById('balance').innerText = balance;

    // Reset the bet size to the original bet
    betSize = originalBet;
    document.getElementById('bet-size').value = originalBet;

    // Enable the bet input field and buttons
    document.getElementById('bet-size').disabled = false;
    document.getElementById('half-bet').style.display = 'inline-block';
    document.getElementById('double-bet').style.display = 'inline-block';

    // Update multiplier to 0 if lose or cashout
    document.getElementById('multi').innerText = 0;

    // Hide the heads, tails, and cash out buttons
    document.getElementById('bet-selection').style.display = 'none';

    // Show the place bet button again
    document.getElementById('place-bet').style.display = 'inline-block';

    // Update the status message
    document.getElementById('status').innerText = "Ready to place another bet.";
    document.getElementById('status').className = ''; // Remove any status classes
}

// Function to adjust the bet size
function adjustBet(action) {
    let betInput = document.getElementById('bet-size');
    let currentBet = parseInt(betInput.value);
    
    if (action === 'half' && currentBet > 1) {
        betInput.value = Math.floor(currentBet / 2);
    } else if (action === 'double') {
        betInput.value = currentBet * 2;
    }
}

/*
// Function to flip the coin
async function flipCoin() {
    if (isFlipping) return;
    isFlipping = true;

    // Trigger the animation by adding the 'flipping' class to the coin element
    const coinElement = document.getElementById('coin');
    coinElement.classList.add('flipping');

    // Simulate a delay to allow the animation to complete
    setTimeout(() => {
        // Simulate a coin flip result
        const randomNumber = Math.floor(Math.random() * 2); // Generate random integer either 0 or 1
        const result = randomNumber === 0 ? 'heads' : 'tails'; // Determine outcome based on random number

        
        // Update balance and display result
        if (result === selectedOutcome) {
            betSize *= 2; // Double the bet size for the next bet
            multiplier *= 2; // Update the multiplier
            document.getElementById('status').innerText = 'You win!'; // Update game status
            document.getElementById('multi').innerText = multiplier; // Update multiplier if win
            document.getElementById('bet-size').value = betSize; // Update the input field with the new bet size
            document.getElementById('cash-out').style.display = 'inline-block'; // Show cash out button
        } else {
            balance -= originalBet; // Decrement balance by bet size
            betSize = 1; // Reset the bet size to 1
            document.getElementById('bet-size').value = originalBet; // Sets bet back to original bet
            document.getElementById('status').innerText = 'You lose!'; // Update game status
            document.getElementById('multi').innerText = 0; // Update multiplier to 0 if lose or cashout
            document.getElementById('place-bet').style.display = 'inline-block'; // Show the place bet button again
            document.getElementById('bet-selection').style.display = 'none'; // Hide outcome selection
        }

        // Update UI with new balance
        document.getElementById('balance').innerText = balance;

        // Reset the animation by removing the 'flipping' class after a short delay
        setTimeout(() => {
            coinElement.classList.remove('flipping');
            isFlipping = false;
        }, 1000); // Adjust this delay to match your animation duration
    }, 1000); // Adjust this delay to match your animation duration
}
*/



