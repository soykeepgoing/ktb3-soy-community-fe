import { signUp } from "../components/users/signUp.js";
import { attachSignUpEvents } from "../handle/users/handleSignUpEvents.js";

export function SignUpPage(){
    const section = signUp();
    attachSignUpEvents(section);
    return section;
}