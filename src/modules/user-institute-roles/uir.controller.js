import * as s from './uir.service.js';

const safe = fn => async (req, res) => {
    try {
        const result = await fn(req);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getUserInstituteRoles = safe(async (req) => {
    const { userId } = req.params;
    return await s.getUserInstituteRoles(userId);
});

export const getUserInstituteRole = safe(async (req) => {
    const { tenantId, instituteId, userId } = req.params;
    return await s.getUserInstituteRole(tenantId, instituteId, userId);
});

export const getUserInstitutes = safe(async (req) => {
    const { userId } = req.params;
    if(!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    return await s.getUserInstitutes(userId);
});


export const insertUserInstituteRole = safe(async (req) => {
    const { tenantId, instituteId, userId } = req.params;
    return await s.insertUserInstituteRole({
        ...req.body,
        tenantId,
        instituteId,
        userId
    });
});

export const updateUserInstituteRole = safe(async (req) => {
    const { tenantId, instituteId, userId } = req.params;
    return await s.updateUserInstituteRole({
        ...req.body,
        tenantId,
        instituteId,
        userId
    });
});

export const deleteUserInstituteRole = safe(async (req) => {
    const { tenantId, instituteId, userId } = req.params;
    return await s.deleteUserInstituteRole(tenantId, instituteId, userId);
});


