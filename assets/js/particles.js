(() => {
  const canvas = document.getElementById('particles-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, 150);
  renderer.setClearColor(0x000000, 0); // transparent background

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 150, 0.1, 1000);
  camera.position.z = 50;

  const particleCount = 100;
  const geometry = new THREE.BufferGeometry();
  const positions = [];

  for (let i = 0; i < particleCount; i++) {
    positions.push(
      (Math.random() - 0.5) * window.innerWidth / 10,
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 20
    );
  }
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xf7c59f,
    size: 2,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  function animate() {
    requestAnimationFrame(animate);
    particles.rotation.y += 0.0015;
    particles.rotation.x += 0.0008;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, 150);
    camera.aspect = window.innerWidth / 150;
    camera.updateProjectionMatrix();
  });
})();
