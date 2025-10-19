
export const CheckValidation = (emailId, password) => {
    const errors = {};

    const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailId);
    const ValidatePassword = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/.test(password);

    if (!validateEmail) errors.email = "Email id is not valid";
    if (!ValidatePassword) errors.password = "Password is not valid";

    return errors;
};

