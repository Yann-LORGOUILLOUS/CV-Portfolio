// MENU BURGER RESPONSIVE
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector('.burger');
  const navMenu = document.querySelector('nav ul');

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navMenu.classList.toggle('open');

    const expanded = burger.getAttribute('aria-expanded') === 'true' || false;
    burger.setAttribute('aria-expanded', !expanded);
  });

  // ANIMATION DES BARRES DE COMPÉTENCES AU SCROLL
  function animateSkillBars() {
    const bars = document.querySelectorAll('.bar');
    const skillsSection = document.querySelector('#skills');
    const sectionTop = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
      bars.forEach(bar => {
        const fill = bar.dataset.fill;
        bar.classList.add('animate');
        if (fill) bar.classList.add(fill);
      });
      window.removeEventListener('scroll', animateSkillBars);
    }
  }

  window.addEventListener('scroll', animateSkillBars);
});

// BOUTON "RETOUR EN HAUT"
document.addEventListener("DOMContentLoaded", () => {
  const scrollToTopBtn = document.getElementById("scrollToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add("show");
    } else {
      scrollToTopBtn.classList.remove("show");
    }
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});

// GESTION DU FORMULAIRE DE CONTACT (Formspree)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  const status = document.getElementById("form-status");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validation JS (double sécurité avec HTML5)
    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const message = form.querySelector('textarea[name="message"]');
    const honeypot = form.querySelector('input[name="_gotcha"]');

    if (!name.value || !email.value || !message.value || honeypot.value) {
      status.textContent = "❌ Veuillez remplir tous les champs correctement.";
      status.className = "form-status error";
      status.hidden = false;
      return;
    }

    const formData = new FormData(form);
    const action = form.getAttribute("action");

    try {
      const response = await fetch(action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        form.reset();
        status.textContent = "✅ Votre message a été envoyé avec succès.";
        status.className = "form-status success";
        status.hidden = false;
      } else {
        throw new Error("Échec d'envoi");
      }

    } catch (error) {
      status.textContent = "❌ Une erreur est survenue. Veuillez réessayer.";
      status.className = "form-status error";
      status.hidden = false;
    }
  });
});