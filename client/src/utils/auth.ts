export function getUser() {
  return {
    role: localStorage.getItem("role"),
    email: localStorage.getItem("email"),
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  };
}

export function logout() {
  localStorage.clear();
}