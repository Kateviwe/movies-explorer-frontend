import React from 'react';

// Кастомный хук для валидации формы
export function useFormWithValidation() {
    const [values, setValues] = React.useState({});
    const [textErrors, setTextErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);

    // Обработчик изменения инпута обновляет стейт
    const handleChange = (evt) => {
        const input = evt.target;
        const name = input.name;
        const value = input.value;
        setValues({...values, [name]: value});
        setTextErrors({...textErrors, [name]: input.validationMessage });
        setIsValid(input.closest("form").checkValidity());
    };

    const resetForm = React.useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
          setValues(newValues);
          setTextErrors(newErrors);
          setIsValid(newIsValid);
        },
        [setValues, setTextErrors, setIsValid]
      );
    
    return { values, textErrors, isValid, handleChange, resetForm };
}
