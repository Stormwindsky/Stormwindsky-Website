// On attend que la page soit chargée
window.addEventListener('load', () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Alpha pour la transparence

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Style pour l'overlay
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.pointerEvents = 'none'; // Pour ne pas bloquer les clics sur le site
    renderer.domElement.style.zIndex = '9999';
    document.body.appendChild(renderer.domElement);

    // --- Géométrie de la Pluie ---
    const rainCount = 1500;
    const rainGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(rainCount * 3);
    const velocities = new Float32Array(rainCount);

    for (let i = 0; i < rainCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 20;     // X
        positions[i + 1] = Math.random() * 20;         // Y
        positions[i + 2] = (Math.random() - 0.5) * 10; // Z
        velocities[i/3] = 0.1 + Math.random() * 0.2;   // Vitesse individuelle
    }

    rainGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const rainMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.1,
        transparent: true,
        opacity: 0.6
    });

    const rain = new THREE.Points(rainGeometry, rainMaterial);
    scene.add(rain);

    // --- Effet de Splash (Simple) ---
    // On crée un petit cercle qui s'anime au sol (Y = 0)
    const splashGeometry = new THREE.RingGeometry(0.01, 0.05, 8);
    const splashMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc, transparent: true, opacity: 0 });
    const splash = new THREE.Mesh(splashGeometry, splashMaterial);
    splash.rotation.x = -Math.PI / 2;
    scene.add(splash);

    camera.position.z = 5;

    // --- Animation ---
    function animate() {
        requestAnimationFrame(animate);

        const positions = rainGeometry.attributes.position.array;

        for (let i = 0; i < rainCount; i++) {
            let idx = i * 3 + 1; // Index de la coordonnée Y
            positions[idx] -= velocities[i]; // La pluie tombe

            // Si la goutte touche le "sol"
            if (positions[idx] < -5) {
                // Déclencher le splash à cette position
                splash.position.set(positions[idx - 1], -5, positions[idx + 1]);
                splash.material.opacity = 0.5;
                splash.scale.set(1, 1, 1);
                
                // Reset de la goutte
                positions[idx] = 10;
            }
        }

        // Animation douce du splash (disparition)
        if (splash.material.opacity > 0) {
            splash.material.opacity -= 0.02;
            splash.scale.x += 0.1;
            splash.scale.y += 0.1;
        }

        rainGeometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
    }

    // Gestion du redimensionnement
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();
});