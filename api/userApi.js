export async function loginUser(userData) {
  return await fetch("http://localhost:8080/api/users/auth", {
    method: "POST",
    headers: { 
        "Accept": "application/json",
        "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
}
