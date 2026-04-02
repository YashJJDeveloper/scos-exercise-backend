export const INSERT_USER_INSTITUTE_ROLE = `
INSERT INTO user_institute_roles 
(tenant_id, institute_id, user_id, role_id, is_primary)
 VALUES ($1, $2, $3, $4, $5) 
 RETURNING *`;

export const UPDATE_USER_INSTITUTE_ROLE = `
UPDATE user_institute_roles 
SET role_id = $1, is_primary = $2, updated_at = now() 
WHERE tenant_id = $3 AND institute_id = $4 AND user_id = $5 
RETURNING *`;

export const GET_USER_INSTITUTE_ROLES_BY_USER_ID = `
SELECT * FROM user_institute_roles 
WHERE  user_id = $1`;

export const GET_USER_INSTITUTE_ROLES_BY_INSTITUTE_ID = `
SELECT * FROM user_institute_roles 
WHERE tenant_id = $1 AND institute_id = $2`;

export const GET_USER_INSTITUTE_ROLE_BY_ID = `
SELECT * FROM user_institute_roles 
WHERE tenant_id = $1 AND institute_id = $2 AND user_id = $3`;

export const DELETE_USER_INSTITUTE_ROLE_BY_ID = `
DELETE FROM user_institute_roles 
WHERE tenant_id = $1 AND institute_id = $2 AND user_id = $3 
RETURNING *`;

export const GET_USER_INSTITUTES = `SELECT 
    i.inst_id,
    i.name AS institute_name,
    i.logo_url AS inst_logo,
    json_agg(
        json_build_object(
            'role_id', r.id,
            'role_name', r.name,
            'role_logo', r.logo_url
        )
    ) AS roles
FROM user_institute_roles uir
JOIN institutes i ON i.inst_id = uir.institute_id
JOIN roles r ON r.id = uir.role_id
WHERE uir.user_id = $1
GROUP BY i.inst_id, i.name, i.logo_url;`;

export const GET_USER_BY_EMAIL = `
SELECT * FROM users WHERE email = $1
`;