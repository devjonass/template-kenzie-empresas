import { renderAllDep, renderUsersRegisters } from "../adminPage/index.js";
import {
  deleteDep,
  deleteUsers,
  editDepartment,
  updateInfoUsers,
} from "./requests.js";

export const renderEditDep = (id, description) => {
  const form = document.createElement("form");

  form.classList.add("formbase");

  form.insertAdjacentHTML(
    "beforeend",
    `
      <h3>Editar Departamento</h3>
      
      <input type="description" id="description" placeholder="Valores anteriores da descrição" name="description" value="${description}" required>
      
          <button class="button" type="submit">Salvar alterações</button>
      
  `
  );

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const inputs = [...form.elements];

    const body = {};

    inputs.forEach((elem) => {
      if (elem.tagName == "INPUT" && elem.value !== "") {
        body[elem.id] = elem.value;
      }
    });

    await editDepartment(id, body);
    await renderAllDep();
  });

  return form;
};

export const deleteDepForm = (id) => {
  const form = document.createElement("form");
  form.classList.add("formbase");

  form.insertAdjacentHTML(
    "beforeend",
    `
      <h3>Realmente deseja deletar o Departamento NOME e demitir seus funcionários</h3>
      
          <button type="submit" class="excluirButton">Confirmar</button>
      
  `
  );

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    await deleteDep(id);
    await renderAllDep();
  });

  return form;
};

export const renderEditUser = ({ id, kindofwork, professional_level }) => {
  const formulario = document.createElement("form");
  formulario.classList.add("formbase");

  formulario.insertAdjacentHTML(
    "beforeend",
    `
      <h3>Editar Usuário</h3>
      
      <select name="">
            <option>Selecionar modalidade de trabalho</option>
            <option value="${kindofwork}">Home-office</option>
            <option value="${kindofwork}">Presencial</option>
            <option value="${kindofwork}">Híbrido</option>
            
        </select>

        <select name="">
        <option>Selecionar nível profissional</option>
        <option value="${professional_level}">estágio</option>
        <option value="${professional_level}">júnior</option>
        <option value="${professional_level}">pleno</option>
        <option value="${professional_level}">sênior</option>
    </select>
      
          <button class="button" type="submit">Editar</button>
      
  `
  );

  formulario.addEventListener("submit", async (event) => {
    event.preventDefault();
    const inputs = [...event.target];

    const dep = {};

    inputs.forEach(({ name, value }) => {
      if (name) {
        dep[name] = value;
      }
    });

    await editUsers(id, dep);
    await renderUsersRegisters();
  });

  return formulario;
};

export const deleteUsersModal = (id) => {
  const form = document.createElement("form");
  form.classList.add("form");

  form.insertAdjacentHTML(
    "beforeend",
    `
  <h3>Realmente deseja remover o usuário NOME?</h3>

  
    <button type="submit" class="excluirButton"> Deletar </button>
  

 `
  );

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await deleteUsers(id);
    await renderUsersRegisters();
  });

  return form;
};


