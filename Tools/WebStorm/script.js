document.addEventListener('DOMContentLoaded', function () {
    const htmlEditor = document.getElementById('htmlEditor');
    const cssEditor = document.getElementById('cssEditor');
    const jsEditor = document.getElementById('jsEditor');
    const preview = document.getElementById('preview');
    const saveButton = document.getElementById('saveButton');
    const editButton = document.getElementById('editButton');
    const copyLinkButton = document.getElementById('copyLinkButton');
    const editorContainer = document.querySelector('.editor');

    let isEditMode = true;

    // Mettre à jour la prévisualisation
    function updatePreview() {
        const html = htmlEditor.value;
        const css = `<style>${cssEditor.value}</style>`;
        const js = `<script>${jsEditor.value}</script>`;
        const content = `${css}${html}${js}`;
        preview.srcdoc = content;
    }

    // Sauvegarder le contenu dans l'URL
    function saveContent() {
        const content = {
            html: htmlEditor.value,
            css: cssEditor.value,
            js: jsEditor.value
        };
        const data = JSON.stringify(content);
        const base64 = btoa(data); // Encoder en Base64
        const url = `${window.location.origin}${window.location.pathname}?content=${base64}`;
        window.history.pushState({}, '', url); // Mettre à jour l'URL
        alert('Contenu sauvegardé dans l\'URL !');
    }

    // Charger le contenu depuis l'URL
    function loadContent() {
        const urlParams = new URLSearchParams(window.location.search);
        const content = urlParams.get('content');
        if (content) {
            const data = atob(content); // Décoder le Base64
            const { html, css, js } = JSON.parse(data);
            htmlEditor.value = html;
            cssEditor.value = css;
            jsEditor.value = js;
            updatePreview();
        }
    }

    // Copier le lien dans le presse-papiers
    function copyLink() {
        const content = {
            html: htmlEditor.value,
            css: cssEditor.value,
            js: jsEditor.value
        };
        const data = JSON.stringify(content);
        const base64 = btoa(data);
        const url = `${window.location.origin}${window.location.pathname}?content=${base64}`;
        navigator.clipboard.writeText(url).then(() => {
            alert('Lien copié dans le presse-papiers !');
        }).catch(() => {
            alert('Erreur lors de la copie du lien.');
        });
    }

    // Basculer entre le mode édition et le mode prévisualisation
    function toggleEditMode() {
        isEditMode = !isEditMode;
        if (isEditMode) {
            // Mode édition : afficher les éditeurs et cacher l'iframe
            editorContainer.classList.remove('hidden');
            preview.classList.remove('fullscreen');
            preview.style.display = 'block';
            editButton.textContent = 'Prévisualiser';
        } else {
            // Mode prévisualisation : cacher les éditeurs et afficher l'iframe en plein écran
            editorContainer.classList.add('hidden');
            preview.classList.add('fullscreen');
            preview.style.display = 'block';
            editButton.textContent = 'Modifier';
            updatePreview();
        }
    }

    // Écouteurs d'événements
    htmlEditor.addEventListener('input', updatePreview);
    cssEditor.addEventListener('input', updatePreview);
    jsEditor.addEventListener('input', updatePreview);
    saveButton.addEventListener('click', saveContent);
    editButton.addEventListener('click', toggleEditMode);
    copyLinkButton.addEventListener('click', copyLink);

    // Initialisation
    loadContent();
    updatePreview();
});