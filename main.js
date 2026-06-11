// Load Gate (Using your actual filename: door-compressed.glb)
loader.load('./assets/door-compressed.glb', (gltf) => {
    gate = gltf.scene;
    gate.position.set(0, 0, 10); 
    scene.add(gate);
    checkLoadStatus();
}, undefined, (err) => console.error("Error loading gate:", err));

// Load Corridor (Using your actual filename: doors_corridor.glb)
loader.load('./assets/doors_corridor.glb', (gltf) => {
    corridor = gltf.scene;
    corridor.position.set(0, 0, 0);
    scene.add(corridor);
    checkLoadStatus();
}, undefined, (err) => console.error("Error loading corridor:", err));

// Load Scorpio N Car (Using your actual filename)
loader.load('./assets/2022_mahindra_scorpio-n-compressed.glb', (gltf) => {
    car = gltf.scene;
    car.position.set(0, 0, 15); 
    car.scale.set(1.2, 1.2, 1.2); 
    scene.add(car);
    checkLoadStatus();
}, undefined, (err) => console.error("Error loading car:", err));
