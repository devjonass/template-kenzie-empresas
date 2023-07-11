import { openModal } from "../modal/index.js";
import {
  getUserlog,
  getUsersAndDp,
  getUsersDep,
  updateInfoUsers,
} from "../scripts/requests.js";

const btnLogout = document.querySelector("#logout");
btnLogout.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.replace("/src/pages/home/index.html");
});

export const renderUserLog = async () => {
  const divDaddy = document.querySelector(".user_info");
  divDaddy.innerHTML = "";
  const user = await getUserlog();
  const h3 = document.createElement("h3");
  const div = document.createElement("div");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");

  div.classList.add("user_test");
  h3.innerText = user.username;
  p1.innerText = user.email;
  p2.innerText = user.professional_level;
  p3.innerText = user.kind_of_work;
  if (user.department_uuid == null) {
    document.querySelector(".container_company").style.display = "none";
    document.querySelector(".err").innerText = "Você ainda não foi contratado";
  }
  div.append(p1, p2, p3);
  divDaddy.append(h3, div);
};

renderUserLog();

const editModalUser = () => {
  const form = document.createElement("form");

  form.classList.add("formbase");

  form.insertAdjacentHTML(
    "beforeend",
    `
      <h3>Editar Perfil</h3>
      
      <input type="text" id="username" placeholder="Seu nome" name="username" required>
      <input type="text" id="email" placeholder="Seu e-mail" name="email"  required>
      <input type="password" id="password" placeholder="Sua senha" name="password" required>
      
          <button class="button" type="submit">Editar perfil</button>
      
  `
  );

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const inputs = [...form.elements];

    const body = {};

    inputs.forEach((elem) => {
      if (elem.tagName == "INPUT" && elem.value !== "") {
        body[elem.name] = elem.value;
      }
    });

    modal.innerHTML = "";

    await updateInfoUsers(body);
    await renderUserLog();
  });

  return form;
};

const btn = document.getElementById("btn_user_edit");
btn.addEventListener("click", () => {
  const formEdit = editModalUser();
  openModal(formEdit);
});

const renderDepartamentAndUsers = async () => {
  const container = document.querySelector(".container_company");
  const dp = await getUsersDep();

  const h2 = document.createElement("h2");
  h2.classList.add("title_companys");
  const span = document.createElement("span");
  h2.innerText = dp.name;
  dp.departments.forEach((elem) => {
    span.innerText = ` - ${elem.name}`;
  });

  h2.append(span);

  container.append(h2);
};

renderDepartamentAndUsers();

const renderListUsers = async () => {
  const user = await getUsersAndDp();

  const usernames = user[0].users;

  const ul = document.querySelector(".list_users");

  usernames.forEach((elem) => {
    console.log(elem);
    const li = document.createElement("li");
    const h4 = document.createElement("h4");
    const p = document.createElement("p");
    h4.innerText = elem.username;
    p.innerText = elem.professional_level;

    li.append(h4, p);
    ul.append(li);
  });
};
renderListUsers();
