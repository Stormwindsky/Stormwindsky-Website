document.addEventListener('DOMContentLoaded', function () {
    const linksContainer = document.getElementById('links');
    const editBtn = document.getElementById('editBtn');
    const shareBtn = document.getElementById('shareBtn');
    const modal = document.getElementById('editModal');
    const closeBtn = document.querySelector('.close');
    const saveBtn = document.getElementById('saveBtn');
    const linkInput = document.getElementById('linkInput');

    let links = [];

    // Load links from localStorage or URL
    function loadLinks() {
        const urlParams = new URLSearchParams(window.location.search);
        const savedLinks = urlParams.get('links');
        if (savedLinks) {
            links = JSON.parse(atob(savedLinks));
        } else if (localStorage.getItem('links')) {
            links = JSON.parse(localStorage.getItem('links'));
        }
        renderLinks();
    }

    // Render links
    function renderLinks() {
        linksContainer.innerHTML = '';
        links.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url;
            a.textContent = link.text;
            linksContainer.appendChild(a);
        });
    }

    // Open modal
    editBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        linkInput.value = JSON.stringify(links, null, 2);
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Save links
    saveBtn.addEventListener('click', () => {
        try {
            links = JSON.parse(linkInput.value);
            localStorage.setItem('links', JSON.stringify(links));
            renderLinks();
            modal.style.display = 'none';
        } catch (e) {
            alert('Invalid JSON format');
        }
    });

    // Generate shareable link
    shareBtn.addEventListener('click', () => {
        const data = btoa(JSON.stringify(links));
        const url = `${window.location.origin}${window.location.pathname}?links=${data}`;
        alert(`Shareable link: ${url}`);
    });

    // Initialize
    loadLinks();
});