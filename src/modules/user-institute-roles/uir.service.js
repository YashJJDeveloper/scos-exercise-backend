import * as repo from './uir.repository.js';
import { validateId, validateUpdateUserInstituteRole, validateUserInstituteRole } from './uir.validator.js';

export const getUserInstituteRoles = async (userId) => {

    return await repo.getUserInstituteRoles(userId);
};

export const getUserInstituteRole = async (tenantId, instituteId, userId) => {
    validateId(tenantId, instituteId, userId);
    return await repo.getUserInstituteRole(tenantId, instituteId, userId);
};

export const getUserInstitutes = async (userId) => {
    return await repo.getUserInstitutes(userId);
};
export const insertUserInstituteRole = async (data) => {
    validateUserInstituteRole(data);
    const { tenantId, instituteId, userId, roleId, isPrimary } = data;
    return await repo.insertUserInstituteRole(tenantId, instituteId, userId, roleId, isPrimary);
};

export const updateUserInstituteRole = async (data) => {
    validateUpdateUserInstituteRole(data);
    const { tenantId, instituteId, userId, roleId, isPrimary } = data;
    return await repo.updateUserInstituteRole(tenantId, instituteId, userId, roleId, isPrimary);
};

export const deleteUserInstituteRole = async (tenantId, instituteId, userId) => {
    validateId(tenantId, instituteId, userId);
    return await repo.deleteUserInstituteRole(tenantId, instituteId, userId);
};

