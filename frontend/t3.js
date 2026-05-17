const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const form = document.querySelector(".reservation-form");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const data = {
    name: form[0].value,
    email: form[1].value,
    date: form[2].value,
    time: form[3].value
  };

  const response = await fetch("/reserve", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(data)

  });

  const result = await response.json();

  alert(result.message);

  form.reset();

});