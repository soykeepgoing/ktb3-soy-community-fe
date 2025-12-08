import { useState } from "./useState.js";
import { useEffect } from "./useEffect.js";

export function useInputField(initialValue, validator){
    const [value, setValue] = useState(initialValue);
    const [helperText, setHelperText] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isTouched, setTouched] = useState(false);


    useEffect(() => {
        if (!isTouched) return;
        const {success, helperText} = validator(value);
        setHelperText(helperText);
        setIsValid(success);
        return;
    }, [value, isTouched]);

    return {
        value, helperText, 
        isValid, isTouched, 
        setValue, setTouched
    }

}