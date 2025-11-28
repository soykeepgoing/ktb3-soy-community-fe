export async function findAllMembers() {
    const res = await fetch("http://localhost:8080/api/admin/members", {
        credentials: "include"
    });
    return res;
}