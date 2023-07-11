import { register } from "../scripts/requests.js";

const btnHome = document.querySelector("#btn_home");
btnHome.addEventListener("click", () => {
  window.location.replace("/src/pages/home/index.html");
});
const btnMobile = document.getElementById("checkbox-menu");
btnMobile.addEventListener("click", () => {
  const btnsHeader = document.getElementById("btns_header");
  btnsHeader.classList.toggle("active");
});

const btnLogin = document.querySelectorAll("#login");
btnLogin.forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location.replace("/src/pages/login/index.html");
  });
});

const eventRegister = () => {
  const form = document.querySelector("form");
  const elements = [...form.elements];

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const body = {};

    elements.forEach((elem) => {
      if (elem.tagName == "INPUT" && elem.value !== "") {
        body[elem.id] = elem.value;
      }
    });

    await register(body);
  });
};

eventRegister();
