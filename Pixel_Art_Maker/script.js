document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('pixelCanvas');
    const colorPicker = document.getElementById('colorPicker');
    const resetButton = document.getElementById('resetButton');
    const saveButton = document.getElementById('saveButton');
    let isDrawing = false;

    // Create the grid
    function createGrid() {
        for (let i = 0; i < 16 * 16; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('mousedown', function () {
                isDrawing = true;
                cell.style.backgroundColor = colorPicker.value;
            });
            cell.addEventListener('mouseover', function () {
                if (isDrawing) {
                    cell.style.backgroundColor = colorPicker.value;
                }
            });
            cell.addEventListener('mouseup', function () {
                isDrawing = false;
            });
            canvas.appendChild(cell);
        }
    }

    // Reset the grid
    function resetGrid() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.style.backgroundColor = '#fff';
        });
    }

    // Save pixel art to the URL
    function savePixelArt() {
        const cells = document.querySelectorAll('.cell');
        const colors = Array.from(cells).map(cell => {
            const color = cell.style.backgroundColor || '#ffffff';
            return color.replace(/ /g, ''); // Remove spaces for encoding
        });
        const data = JSON.stringify(colors);
        const base64 = btoa(data); // Encode to Base64
        const url = `${window.location.origin}${window.location.pathname}?art=${base64}`;
        window.history.pushState({}, '', url); // Update the URL
        alert('Pixel art saved to the URL! Copy this URL to share your drawing.');
    }

    // Load pixel art from the URL
    function loadPixelArt() {
        const urlParams = new URLSearchParams(window.location.search);
        const art = urlParams.get('art');
        if (art) {
            const data = atob(art); // Decode Base64
            const colors = JSON.parse(data);
            const cells = document.querySelectorAll('.cell');
            cells.forEach((cell, index) => {
                cell.style.backgroundColor = colors[index];
            });
        }
    }

    // Event listeners
    resetButton.addEventListener('click', resetGrid);
    saveButton.addEventListener('click', savePixelArt);

    // Initialize
    createGrid();
    loadPixelArt();
});