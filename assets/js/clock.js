    const countdownElement = document.getElementById("countdown");
    const targetDate = new Date("2025-07-18T21:00:00");
    function updateCountdown() {
      const now = new Date();
      const diff = targetDate - now;
      if (diff <= 0) {
        countdownElement.textContent = "Acabou 😢";
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);