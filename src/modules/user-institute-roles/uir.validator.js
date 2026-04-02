export const ensure=(condition, message)=> {

    if(!condition) throw new Error(message);
};

export const validateUserInstituteRole = (d) => {
    ensure(d.tenantId, "Tenant ID is required");
    ensure(d.instituteId, "Institute ID is required");
    ensure(d.userId, "User ID is required");
    ensure(d.roleId, "Role ID is required");
     };

     export const validateUpdateUserInstituteRole = (u) => {
        ensure(u.tenantId, "Tenant ID is required");
        ensure(u.instituteId, "Institute ID is required");
        ensure(u.userId, "User ID is required");
        ensure(u.roleId, "Role ID is required");
    };

     export const validateId = (tenantId, instituteId, userId) => {
    ensure(tenantId, "Tenant ID is required");
    ensure(instituteId, "Institute ID is required");
    ensure(userId, "User ID is required");
     };

     