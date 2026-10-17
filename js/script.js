(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const animatedElements = document.querySelectorAll(".reveal, .media-reveal");

  if (animatedElements.length && !reducedMotion.matches && "IntersectionObserver" in window) {
    document.documentElement.classList.add("js");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -48px" });

    animatedElements.forEach((element) => observer.observe(element));
  }

  let notice = document.querySelector("[data-demo-notice]");
  let noticeTimer;
  let noticeRemovalTimer;
  const showDemoNotice = (product) => {
    if (!notice || !notice.isConnected) {
      notice = document.createElement("p");
      notice.className = "demo-notice";
      notice.dataset.demoNotice = "";
      notice.setAttribute("role", "status");
      notice.setAttribute("aria-live", "polite");
      document.body.append(notice);
    }
    notice.textContent = product
      ? `Demonstração: o pedido de ${product} seria redirecionado para o WhatsApp da hamburgueria.`
      : "Demonstração: este pedido seria redirecionado para o WhatsApp da hamburgueria.";
    notice.classList.remove("is-leaving");
    window.clearTimeout(noticeTimer);
    window.clearTimeout(noticeRemovalTimer);
    noticeTimer = window.setTimeout(() => {
      notice.classList.add("is-leaving");
      noticeRemovalTimer = window.setTimeout(() => notice.remove(), 720);
    }, 3000);
  };

  document.querySelectorAll("[data-pedido]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      showDemoNotice(button.dataset.pedido);
    });
  });
})();
