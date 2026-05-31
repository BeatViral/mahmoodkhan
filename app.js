(function () {
  const canvas = document.getElementById("stageCanvas");
  const context = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let frame = 0;

  function resize() {
    const ratio = window.devicePixelRatio || 1;
    width = canvas.width = Math.floor(window.innerWidth * ratio);
    height = canvas.height = Math.floor(window.innerHeight * ratio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
  }

  function draw() {
    const ratio = window.devicePixelRatio || 1;
    frame += 0.012;
    context.clearRect(0, 0, width, height);
    context.lineWidth = Math.max(1, ratio);

    for (let i = 0; i < 16; i += 1) {
      const y = (height / 17) * (i + 1);
      context.beginPath();
      for (let x = 0; x <= width; x += 22 * ratio) {
        const wave = Math.sin(x * 0.003 + frame + i * 0.8) * 18 * ratio;
        const pulse = Math.cos(x * 0.0014 + frame * 2.2 + i) * 7 * ratio;
        if (x === 0) context.moveTo(x, y + wave + pulse);
        else context.lineTo(x, y + wave + pulse);
      }
      context.strokeStyle = i % 4 === 0
        ? "rgba(255, 51, 102, 0.22)"
        : i % 3 === 0
          ? "rgba(255, 209, 92, 0.2)"
          : "rgba(23, 231, 255, 0.16)";
      context.stroke();
    }

    context.globalAlpha = 0.4;
    for (let x = 0; x < width; x += 96 * ratio) {
      context.beginPath();
      context.moveTo(x + Math.sin(frame + x) * 18 * ratio, 0);
      context.lineTo(x - 260 * ratio, height);
      context.strokeStyle = "rgba(255, 255, 255, 0.045)";
      context.stroke();
    }
    context.globalAlpha = 1;

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();

  const carousel = document.getElementById("chartCarousel");
  const previous = document.querySelector("[data-carousel-prev]");
  const next = document.querySelector("[data-carousel-next]");

  function moveCarousel(direction) {
    if (!carousel) return;
    carousel.scrollBy({
      left: direction * Math.max(320, carousel.clientWidth * 0.82),
      behavior: "smooth"
    });
  }

  if (previous && next) {
    previous.addEventListener("click", () => moveCarousel(-1));
    next.addEventListener("click", () => moveCarousel(1));
  }
}());
