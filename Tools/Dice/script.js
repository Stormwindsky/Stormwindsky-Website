document.getElementById('roll-btn').addEventListener('click', function() {
    const min = parseInt(document.getElementById('min').value);
    const max = parseInt(document.getElementById('max').value);

    if (min >= max) {
        alert("The minimum value must be less than the maximum value.");
        return;
    }

    const result = Math.floor(Math.random() * (max - min + 1)) + min;
    document.getElementById('result').textContent = `Result: ${result}`;
});