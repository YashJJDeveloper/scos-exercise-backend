import express from 'express';
import * as c from './uir.controller.js';
import verifyToken from "../../middleware/verifyToken.js";
const r = express.Router();

r.get('/users/:userId/institute-roles', verifyToken, c.getUserInstituteRoles);
r.get('/users/:userId/institutes', c.getUserInstituteRoles);
r.get('/tenants/:tenantId/institutes/:instituteId/users/:userId/role', c.getUserInstituteRole);
r.get('/users/:userId/institutes-roles-list', c.getUserInstitutes);
r.post('/tenants/:tenantId/institutes/:instituteId/users/:userId/role', c.insertUserInstituteRole);
r.put('/tenants/:tenantId/institutes/:instituteId/users/:userId/role', c.updateUserInstituteRole);
r.delete('/tenants/:tenantId/institutes/:instituteId/users/:userId/role', c.deleteUserInstituteRole);


export default r;