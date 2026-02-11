(function() {
    // 1. Création des styles CSS pour l'animation de tremblement
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes shakeEffect {
            0% { transform: translate(1px, 1px) rotate(0deg); }
            10% { transform: translate(-1px, -2px) rotate(-1deg); }
            20% { transform: translate(-3px, 0px) rotate(1deg); }
            30% { transform: translate(3px, 2px) rotate(0deg); }
            40% { transform: translate(1px, -1px) rotate(1deg); }
            50% { transform: translate(-1px, 2px) rotate(-1deg); }
            60% { transform: translate(-3px, 1px) rotate(0deg); }
            70% { transform: translate(3px, 1px) rotate(-1deg); }
            80% { transform: translate(-1px, -1px) rotate(1deg); }
            90% { transform: translate(1px, 2px) rotate(0deg); }
            100% { transform: translate(1px, -2px) rotate(-1deg); }
        }

        .screen-shake {
            animation: shakeEffect 0.4s; /* Durée du tremblement */
            animation-iteration-count: 1;
        }
    `;
    document.head.appendChild(style);

    // 2. Écouteur d'événement sur le clavier
    window.addEventListener('keydown', (event) => {
        // On évite de relancer l'animation si elle est déjà en cours
        if (!document.body.classList.contains('screen-shake')) {
            document.body.classList.add('screen-shake');

            // 3. On retire la classe après l'animation pour pouvoir recommencer
            setTimeout(() => {
                document.body.classList.remove('screen-shake');
            }, 400); // Doit correspondre à la durée du CSS (0.4s)
        }
    });
})();