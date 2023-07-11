import {
  getCompaniesSectors,
  getSectors,
  renderCompanies,
} from "../scripts/requests.js";

const select = document.querySelector("#sectors");
const ul = document.querySelector(".list_companies_name_and_hours");


const renderSectors = async () => {
  const sectors = await getSectors();
  sectors.forEach((sect) => {
    const options = document.createElement("option");

    options.innerText = sect.description;

    select.append(options);
  });
};

await renderSectors();

const btnMobile = document.getElementById("checkbox-menu");
btnMobile.addEventListener("click", () => {
  const btnsHeader = document.getElementById("btns_header");
  btnsHeader.classList.toggle("active");
});

async function eventSelect() {
  const employes = await renderCompanies();
  employes.forEach((comp) => {
    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const btn = document.createElement("button");

    h3.innerText = comp.name;
    p.innerText = comp.opening_hours;
    btn.innerText = comp.sectors.description;

    li.append(h3, p, btn);
    ul.append(li);
  });
  select.addEventListener("change", async () => {
    ul.innerHTML = "";
    const optionValue = select.options[select.selectedIndex];
    const value = optionValue.value;
    const companies = await getCompaniesSectors(value);
    companies.forEach((comp) => {
      const li = document.createElement("li");
      const h3 = document.createElement("h3");
      const p = document.createElement("p");
      const btn = document.createElement("button");

      h3.innerText = comp.name;
      p.innerText = comp.opening_hours;
      btn.innerText = comp.sectors.description;

      li.append(h3, p, btn);
      ul.append(li);
    });
  });
}

await eventSelect();

const login = document.querySelector("#login");

login.addEventListener("click", () => {
  window.location.replace("/src/pages/login/index.html");
});

const register = document.querySelector("#register");

register.addEventListener("click", () => {
  window.location.replace("/src/pages/register/index.html");
});
