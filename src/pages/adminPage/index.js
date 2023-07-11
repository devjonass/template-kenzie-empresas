import { openModal } from "../modal/index.js";
import {
  deleteDepForm,
  deleteUsersModal,
  renderEditDep,
  renderEditUser,
} from "../scripts/forms.js";
import {
  createDepartments,
  editUsers,
  listAllDepartaments,
  listDepartaments,
  listUsers,
  renderCompanies,
} from "../scripts/requests.js";

let select = document.querySelector("#select_home");
let ul = document.querySelector(".list_departaments_descriptions");
const btnLogout = document.querySelector("#logout");
btnLogout.addEventListener("click", () => {
  localStorage.removeItem("userAdmin" || "user");
  window.location.replace("/src/pages/home/index.html");
});

export const renderAllCompanies = async () => {
  const companies = await renderCompanies();

  companies.forEach((sect) => {
    const options = document.createElement("option");

    options.innerText = sect.name;
    options.value = sect.uuid;

    select.append(options);
  });
};

await renderAllCompanies();

export const renderAllDep = async () => {
  const depart = await listDepartaments();
  ul.innerHTML = "";
  depart.forEach((department) => {
    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const pTwo = document.createElement("p");
    const div = document.createElement("div");
    const btnView = document.createElement("button");
    const btnEdit = document.createElement("button");
    const btnDelete = document.createElement("button");

    div.classList.add("btns_modais");
    btnView.classList.add("vector_view");
    btnEdit.classList.add("vector_edit");
    btnDelete.classList.add("vector_delete");

    h3.innerText = department.name;
    p.innerText = department.description;
    pTwo.innerText = department.companies.name;

    btnEdit.addEventListener("click", () => {
      const formEdit = renderEditDep(department.uuid, department.description);
      console.log(department.uuid);
      openModal(formEdit);
    });
    btnDelete.addEventListener("click", () => {
      const deleteForm = deleteDepForm(department.uuid);
      openModal(deleteForm);
    });
    div.append(btnView, btnEdit, btnDelete);
    li.append(h3, p, pTwo, div);
    ul.append(li);
  });
};
renderAllDep();

export const renderDepartaments = async () => {
  select.addEventListener("change", async () => {
    const optionValue = select.options[select.selectedIndex];
    const value = optionValue.value;

    const depart = await listAllDepartaments(value);
    ul.innerHTML = "";
    depart.forEach((department) => {
      const li = document.createElement("li");
      const h3 = document.createElement("h3");
      const p = document.createElement("p");
      const pTwo = document.createElement("p");
      const div = document.createElement("div");
      const btnView = document.createElement("button");
      const btnEdit = document.createElement("button");
      const btnDelete = document.createElement("button");

      div.classList.add("btns_modais");
      btnView.classList.add("vector_view");
      btnEdit.classList.add("vector_edit");
      btnDelete.classList.add("vector_delete");

      h3.innerText = department.name;
      p.innerText = department.description;
      pTwo.innerText = department.companies.name;
      btnEdit.addEventListener("click", () => {
        const formEdit = renderEditDep(department);
        openModal(formEdit);
      });
      btnDelete.addEventListener("click", () => {
        const deleteForm = deleteDepForm(department.uuid);
        openModal(deleteForm);
      });

      div.append(btnView, btnEdit, btnDelete);
      li.append(h3, p, pTwo, div);
      ul.append(li);
    });
  });
};

renderDepartaments();

export const renderUsersRegisters = async () => {
  const ul = document.querySelector(".list_users_registers");
  ul.innerHTML = "";
  const users = await listUsers();
  users.forEach((user) => {
    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const pTwo = document.createElement("p");
    const div = document.createElement("div");
    const btnEdit = document.createElement("button");
    const btnDelete = document.createElement("button");
    div.classList.add("btns_modais");
    btnEdit.classList.add("vector_edit");
    btnDelete.classList.add("vector_delete");

    h3.innerText = user.username;
    p.innerText = user.kind_of_work;
    pTwo.innerText = user.professional_level;

    btnEdit.addEventListener("click", () => {
      const formEdit = renderEditUser(user);
      openModal(formEdit);
    });

    btnDelete.addEventListener("click", () => {
      const formEdit = deleteUsersModal(user.uuid);
      openModal(formEdit);
    });
    div.append(btnEdit, btnDelete);
    li.append(h3, p, pTwo, div);
    ul.append(li);
  });
};

await renderUsersRegisters();

const createNewPost = async () => {
  const modal = document.querySelector(".modal-container");
  const form = document.createElement("form");
  form.classList.add("formbase");
  const h3 = document.createElement("h3");
  const input = document.createElement("input");
  const inputTwo = document.createElement("input");
  const select = document.createElement("select");

  const button = document.createElement("button");

  h3.innerText = "Criar Departamento";
  input.type = "name";
  input.id = "name";
  input.name = "name";
  input.placeholder = "Nome do departamento";

  inputTwo.type = "description";
  inputTwo.id = "description";
  inputTwo.name = "description";
  inputTwo.placeholder = "descrição do departamento";

  select.id = "company_uuid";

  button.classList = "button";
  button.type = "submit";
  button.innerText = "Criar departamento";

  const companies = await renderCompanies();
  companies.forEach((comp) => {
    const option = document.createElement("option");
    option.value = comp.uuid;
    option.innerText = comp.name;
    select.append(option);
  });

  form.append(h3, input, inputTwo, select, button);
  const btnModal = document.querySelector("#btn_create");
  btnModal.addEventListener("click", () => {
    openModal(form);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputs = [...form.elements];
    const body = {};
    body.innerHTML = "";
    inputs.forEach((elem) => {
      if (
        elem.tagName == "INPUT" ||
        (elem.tagName == "SELECT" && elem.value !== "")
      ) {
        body[elem.id] = elem.value;
      }
    });

    await createDepartments(body);
    await renderAllDep();
  });
};

await createNewPost();

// const patchEditUsers = async (id) => {
//   const modal = document.querySelector(".modal-container");
//   const form = document.createElement("form");
//   form.classList.add("formbase");
//   const h3 = document.createElement("h3");
//   const selectOne = document.createElement("select");
//   const selectTwo = document.createElement("select");
//   const button = document.createElement("button");

//   button.classList = "button";
//   button.type = "submit";
//   button.innerText = "Editar";

//   const users = await listUsers();

//   users.forEach((user) => {
//     const option = document.createElement("option");
//     const optionTwo = document.createElement("option");
//     option.value = user.kind_of_work;
//     optionTwo.value = user.professional_level;
//     selectOne.append(option);
//     selectTwo.append(optionTwo);
//   });

//   form.append(h3, selectOne, selectTwo, button);
//   openModal(form);

//   form.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     const inputs = [...form.elements];

//     const dep = {};

//     inputs.forEach((elem) => {
//       if (elem.tagName == "SELECT") {
//         dep[elem.id] = elem.value;
//       }
//     });

//     await editUsers(id, dep);
//     await renderUsersRegisters();
//   });
// };

// await patchEditUsers();
