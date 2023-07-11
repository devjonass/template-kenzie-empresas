export const getLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem("userAdmin")) || "";

  return user;
};

export const getLocalStorageUser = () => {
  const user = JSON.parse(localStorage.getItem("user")) || "";

  return user;
};
