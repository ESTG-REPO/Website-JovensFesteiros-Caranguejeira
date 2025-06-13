    function createWireframeCube(canvasId) {
      const canvas = document.getElementById(canvasId);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      const geometry = new THREE.BoxGeometry();
      const edges = new THREE.EdgesGeometry(geometry);
      const material = new THREE.LineBasicMaterial({ color: "#00FF00" });
      const wireframe = new THREE.LineSegments(edges, material);
      scene.add(wireframe);
      camera.position.z = 2;
      function animate() {
        requestAnimationFrame(animate);
        wireframe.rotation.x += 0.01;
        wireframe.rotation.y += 0.01;
        renderer.render(scene, camera);
      }
      animate();
    }
    createWireframeCube("leftCube");
    createWireframeCube("rightCube");
