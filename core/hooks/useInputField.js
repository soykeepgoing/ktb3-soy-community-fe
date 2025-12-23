import { useState } from "./useState.js";
import { useEffect } from "./useEffect.js";

export function useInputField(initialValue, validator){
    const [value, setValue] = useState(initialValue);
    const [helperText, setHelperText] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isTouched, setTouched] = useState(false);

    const validate = (currentValue) => {
        const { success, helperText} = validator(currentValue);
        setHelperText(helperText);
        setIsValid(success);
    }

    const handleInput = (newValue) => {

        //console.log(newValue);
        setValue(newValue);
        if (isTouched){
            validate(newValue);
        }
    }

    const handleBlur = () => {
        setTouched(true);
        validate(value);
    }

    return {
        value, 
        helperText, 
        isValid, 
        isTouched, 
        handleInput,
        handleBlur, 
    }
}