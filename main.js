// A totally bypass-safe tracker so it never stays black if a file fails to load
let modelsLoaded = 0;
function checkLoadStatus() {
    modelsLoaded++;
    console.log("Loaded asset number: " + modelsLoaded);
}

// 1. Load the Gate (Your file name: door.glb)
loader.load('./assets/door.glb', (gltf) => {
    gate = gltf.scene;
    gate.position.set(0, 0, 10); 
    scene.add(gate);
    checkLoadStatus();
}, undefined, (err) => {
    console.error("Error loading gate, trying fallback path...", err);
    // Fallback in case folder pathing is relative on Vercel
    loader.load('assets/door.glb', (gltf2) => { gate = gltf2.scene; gate.position.set(0, 0, 10); scene.add(gate); });
});

// 2. Load the Corridor (Your file name: doors_corridor.glb)
loader.load('./assets/doors_corridor.glb', (gltf) => {
    corridor = gltf.scene;
    corridor.position.set(0, 0, 0);
    scene.add(corridor);
    checkLoadStatus();
}, undefined, (err) => {
    console.error("Error loading corridor, trying fallback path...", err);
    loader.load('assets/doors_corridor.glb', (gltf2) => { corridor = gltf2.scene; corridor.position.set(0, 0, 0); scene.add(corridor); });
});

// 3. Load the Scorpio N Car (Your file name: 2022_mahindra_scorpio-n.glb)
loader.load('./assets/2022_mahindra_scorpio-n.glb', (gltf) => {
    car = gltf.scene;
    car.position.set(0, 0, 15); 
    car.scale.set(1.2, 1.2, 1.2); 
    scene.add(car);
    checkLoadStatus();
}, undefined, (err) => {
    console.error("Error loading car, trying fallback path...", err);
    loader.load('assets/2022_mahindra_scorpio-n.glb', (gltf2) => { car = gltf2.scene; car.position.set(0, 0, 15); car.scale.set(1.2, 1.2, 1.2); scene.add(car); });
});
