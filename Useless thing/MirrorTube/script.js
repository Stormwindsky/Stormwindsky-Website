function loadVideo() {
    const videoId = document.getElementById('videoId').value;
    if (videoId) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        const iframe = document.getElementById('youtubeVideo');
        iframe.src = embedUrl;
    } else {
        alert('Please enter a valid YouTube Video ID.');
    }
}