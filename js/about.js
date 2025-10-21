// Hiệu ứng scroll hiện dần
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".about-section, .card, .event");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
});
