import * as repo from "./auth.repository.js";


export const getUserByEmail = async (email) => {
    
    return await repo.getUserByEmail(email);
};
