import  pool  from "../../db/index.js";
import * as Q from './sql/uir.queries.js';

export const getUserInstituteRoles = async (userId) => {
    const { rows } = await pool.query(Q.GET_USER_INSTITUTE_ROLES_BY_USER_ID, [userId]);
    return rows;
};

export const getUserInstituteRole = async (tenantId, instituteId, userId) => {
    const { rows } = await pool.query(Q.GET_USER_INSTITUTE_ROLE_BY_ID, [tenantId, instituteId, userId]);
    return rows[0];
};

export const insertUserInstituteRole = async (tenantId, instituteId, userId, roleId, isPrimary) => {
    const { rows } = await pool.query(Q.INSERT_USER_INSTITUTE_ROLE, [tenantId, instituteId, userId, roleId, isPrimary]);
    return rows[0];
};

export const updateUserInstituteRole = async (tenantId, instituteId, userId, roleId, isPrimary) => {
    const { rows } = await pool.query(Q.UPDATE_USER_INSTITUTE_ROLE, [roleId, isPrimary, tenantId, instituteId, userId]);
    return rows[0];
};

export const deleteUserInstituteRole = async (tenantId, instituteId, userId) => {
    const { rows } = await pool.query(Q.DELETE_USER_INSTITUTE_ROLE_BY_ID, [tenantId, instituteId, userId]);
    if(!rows.length) return null;
    return rows[0];
};

export const getUserInstitutes = async (userId) => {
    const { rows } = await pool.query(
      Q.GET_USER_INSTITUTES,
      [userId]
    );
  
    return rows;
  };

