import { deleteUser } from "../../api/userApi.js";
import { getState } from "../../core/GlobalStore.js";

export async function handleDelete(){
    const userId = getState("userId");
    await deleteUser(userId);
}