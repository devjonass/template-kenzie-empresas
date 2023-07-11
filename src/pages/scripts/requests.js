import { getLocalStorage, getLocalStorageUser } from "./localStorage.js";
import { toastLogin } from "./toast.js";

const baseUrl = "http://localhost:6278/";

export async function getSectors() {
  const request = await fetch(`${baseUrl}sectors`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await request.json();

  return response;
}

export async function getCompaniesSectors(sector) {
  const request = await fetch(`${baseUrl}companies/${sector}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await request.json();

  return response;
}

export async function verifyUsers(token) {
  const request = await fetch(`${baseUrl}auth/validate_user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await request.json();
  console.log(response);

  if (response.is_admin) {
    localStorage.setItem("userAdmin", JSON.stringify(token));
    toastLogin("Sucesso", "Login feito com sucesso");
    setTimeout(() => {
      window.location.replace("/src/pages/adminPage/index.html");
    }, 4000);
  } else {
    localStorage.setItem("user", JSON.stringify(token));
    toastLogin("Sucesso", "Login feito com sucesso");
    setTimeout(() => {
      window.location.replace("/src/pages/userPage/index.html");
    }, 3000);
  }
}

export async function login(body) {
  const request = await fetch(`${baseUrl}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (request.ok) {
    const response = await request.json();

    verifyUsers(response.token);
  } else {
    toastLogin("Erro!", "Algo deu errado");
  }
}

export async function register(body) {
  const request = await fetch(`${baseUrl}auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (request.ok) {
    const response = await request.json();
    console.log(response);
    toastLogin("Sucesso", "Sua conta foi criada");

    setTimeout(() => {
      window.location.replace("/src/pages/login/index.html");
    }, 4000);
  } else {
    toastLogin("Erro", "Algo deu errado");
  }
}

export async function renderCompanies() {
  const request = await fetch(`${baseUrl}companies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await request.json();

  return response;
}

export async function listAllDepartaments(id) {
  const localStorageAdmin = getLocalStorage();
  const request = await fetch(`${baseUrl}departments/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorageAdmin}`,
    },
  });
  const response = await request.json();

  return response;
}

export async function listDepartaments() {
  const localStorageAdmin = getLocalStorage();
  const request = await fetch(`${baseUrl}departments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorageAdmin}`,
    },
  });
  const response = await request.json();

  return response;
}

export async function listUsers() {
  const localStorageAdmin = getLocalStorage();
  const request = await fetch(`${baseUrl}users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorageAdmin}`,
    },
  });
  const response = await request.json();

  return response;
}

export async function createDepartments(body) {
  const localStorageAdmin = getLocalStorage();
  const request = await fetch(`${baseUrl}departments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorageAdmin}`,
    },
    body: JSON.stringify(body),
  });
  const response = await request.json();
  console.log(response);
  return response;
}

export async function editDepartment(id, body) {
  const localStorageAdmin = getLocalStorage();
  try {
    const request = await fetch(`${baseUrl}departments/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageAdmin}`,
      },
      body: JSON.stringify(body),
    });
    const response = await request.json();
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteDep(id) {
  const localStorageAdmin = getLocalStorage();

  try {
    const request = await fetch(`${baseUrl}departments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageAdmin}`,
      },
    });

    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function editUsers(id, body) {
  const localStorageAdmin = getLocalStorage();
  try {
    const request = await fetch(`${baseUrl}admin/update_user/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageAdmin}`,
      },
      body: JSON.stringify(body),
    });
    const response = await request.json();
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteUsers(id) {
  const localStorageAdmin = getLocalStorage();
  const request = await fetch(`${baseUrl}admin/delete_user/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorageAdmin}`,
    },
  });
  const response = await request.json();

  return response;
}

export async function getUserlog() {
  const localStorageUsers = getLocalStorageUser();
  const request = await fetch(`${baseUrl}users/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorageUsers}`,
    },
  });
  const response = await request.json();

  return response;
}

export async function updateInfoUsers(body) {
  const localStorageUsers = getLocalStorageUser();
  const request = await fetch(`${baseUrl}users`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorageUsers}`,
    },
    body: JSON.stringify(body),
  });

  const response = await request.json();
  console.log(response);
}

export async function getUsersDep() {
  const localStorageUsers = getLocalStorageUser();
  const request = await fetch(`${baseUrl}users/departments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorageUsers}`,
    },
  });
  const response = await request.json();

  return response;
}

export async function getUsersAndDp() {
  const localStorageUsers = getLocalStorageUser();
  const request = await fetch(`${baseUrl}users/departments/coworkers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorageUsers}`,
    },
  });
  const response = await request.json();

  return response;
}
