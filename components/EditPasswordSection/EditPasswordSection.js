import { useInputField } from "../../core/hooks/useInputField.js";
import { h } from "../../core/vdom/h.js";
import { validatePw } from "../../utils/validation/validatePw.js";
import { validatePwCheck } from "../../utils/validation/validatePwCheck.js";
import { EditPasswordForm } from "./EditPasswordForm/EditPasswordForm.js";
import {editPassword} from "../../api/userApi.js";

export function EditPasswordSection(){
    const oldPassword = useInputField("", validatePw);
    const newPassword = useInputField("", validatePw);
    const newPasswordCheck = useInputField(
        "", 
        (value) => validatePwCheck(newPassword.value, value)
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        const inputData = {
            userOldPassword: oldPassword.value, 
            userNewPassword: newPassword.value
        };

        await editPassword(inputData);
    };

    return h(
        "section", 
        {className: "edit-password-section"}, 
        h("h2", {}, "비밀번호 수정"), 
        EditPasswordForm({
            oldPassword, 
            newPassword,
            newPasswordCheck, 
            onSubmit: handleSubmit
        })
    );
}
