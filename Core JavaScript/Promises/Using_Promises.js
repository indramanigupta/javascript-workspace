// Promises:

function successCallback(result) {
  console.log(`Audio file ready at URL: ${result}`);
}

function failureCallback(error) {
  console.error(`Error generating audio file: ${error}`);
}

createAudioFileAsync(audioSettings, successCallback, failureCallback);


//If createAudioFileAsync() were rewritten to return a promise, you would attach your callbacks to it instead:
createAudioFileAsync(audioSettings).then(successCallback, failureCallback);


// Cancellation

/**
 * Promise itself has no first-class protocol for cancellation, 
 * but you may be able to directly cancel the underlying asynchronous operation, 
 * typically using AbortController.
 */

setTimeout(() => saySomething("10 seconds passed"), 10 * 1000);