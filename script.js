// Configure this with an official organizational email before publishing.
const CONTACT_EMAIL = "";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Ouvrir le menu" : "Fermer le menu");
  navigation?.classList.toggle("open", !isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Ouvrir le menu");
    navigation.classList.remove("open");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const hint = document.querySelector("#form-hint");
  if (!CONTACT_EMAIL) {
    hint.textContent = "Le formulaire n’est pas encore relié : configurez CONTACT_EMAIL dans script.js avec l’adresse officielle de l’organisation.";
    hint.setAttribute("role", "status");
    return;
  }
  const formData = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Message du site — ${formData.get("name")}`);
  const body = encodeURIComponent(`${formData.get("message")}\n\nNom : ${formData.get("name")}\nE-mail : ${formData.get("email")}`);
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
});
