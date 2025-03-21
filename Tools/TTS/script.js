document.getElementById('speak-button').addEventListener('click', function() {
    const text = document.getElementById('text-to-speech').value;
    if (text.trim() !== "") {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US'; // Set language to English
        speechSynthesis.speak(utterance);
    } else {
        alert("Please enter some text to speak.");
    }
});