export const ensure = (condition, message) => {

    if (!condition) throw new Error(message);
};

export const validateLogin = (d) => {
    ensure(d.email, "Email is required");
    ensure(d.password, "Password is required");
    
};
