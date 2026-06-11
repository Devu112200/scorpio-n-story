// Register GSAP ScrollTrigger Plugin
gsap.registerPlugin(ScrollTrigger);

// --- 1. THREE.JS BASIC SETUP ---
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();

// Add fog to hide edge lines in the corridor
scene.fog = new THREE.FogExp2(0x0b0b0b, 0.05);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
container.appendChild(renderer.domElement);

// --- 2. LIGHTING ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

// --- 3. MODEL LOADERS ---
const loader = new THREE.GLTFLoader();
let gate, corridor, car;

// Master Timeline initialized after models load
function initScrollAnimations() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "main",
            start: "top top",
            end: "bottom bottom",
            scrub: 1, // Smoothly catches up with the scrollbar
        }
    });

    // Step 1: Animate Content Text Fading In/Out
    gsap.utils.toArray(".content").forEach((content, i) => {
        gsap.to(content, {
            opacity: 1,
            y: 0,
            scrollTrigger: {
                trigger: content.closest('.scroll-section'),
                start: "top center",
                end: "bottom center",
                scrub: true,
                toggleActions: "play reverse play reverse"
            }
        });
    });

    // Step 2: 3D Storytelling Sequences mapped to main timeline
    tl.to(camera.position, { z: 5, y: 2, x: 0, duration: 2 }) // Camera adjusts to face the gate
      .to(gate.rotation, { y: Math.PI / 2, duration: 2 }, "-=1") // Gate swings open
      .to(car.position, { z: -15, duration: 4 }) // Car drives forward into the corridor
      .to(camera.position, { z: -10, y: 1.5, duration: 4 }, "-=4") // Camera follows behind the car
      .to(camera.position, { x: 4, z: -18, y: 1, duration: 2 }) // Camera orbits to a dramatic final side-profile view
}

// Loading assets synchronously 
let modelsLoaded = 0;
function checkLoadStatus() {
    modelsLoaded++;
    if (modelsLoaded === 3) {
        initScrollAnimations();
    }
}

// Load Gate
loader.load('./assets/gate.glb', (gltf) => {
    gate = gltf.scene;
    gate.position.set(0, 0, 10); // Place it in front of the corridor
    scene.add(gate);
    checkLoadStatus();
}, undefined, (err) => console.error("Error loading gate:", err));

// Load Corridor
loader.load('./assets/corridor.glb', (gltf) => {
    corridor = gltf.scene;
    corridor.position.set(0, 0, 0);
    scene.add(corridor);
    checkLoadStatus();
}, undefined, (err) => console.error("Error loading corridor:", err));

// Load Scorpio N Car
loader.load('./assets/scorpio_n.glb', (gltf) => {
    car = gltf.scene;
    car.position.set(0, 0, 15); // Start outside the gate
    car.scale.set(1.2, 1.2, 1.2); // Adjust scaling depending on model configurations
    scene.add(car);
    checkLoadStatus();
}, undefined, (err) => console.error("Error loading car:", err));

// Initial Camera Coordinates
camera.position.set(0, 3, 22);

// --- 4. RENDER LOOP ---
function animate() {
    requestAnimationFrame(animate);
    
    // Subtle passive animations (e.g., car running engine shake)
    if (car) {
        car.position.y = Math.sin(Date.now() * 0.005) * 0.01;
    }

    renderer.render(scene, camera);
}
animate();

// --- 5. RESPONSIVENESS ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
      
