import { Router, Request, Response } from 'express';  
import { createEmpresaMiembro,
    getAllEmpresaMiembros,
    getEmpresaMiembroById,
    modifyEmpresaMiembro,
    deleteEmpresaMiembro
 } from '../controllers/empresaMiembroController';

const empresaMiembroRouter:Router = Router();  

empresaMiembroRouter.get('/', getAllEmpresaMiembros);  

empresaMiembroRouter.get('/:id', getEmpresaMiembroById);  

empresaMiembroRouter.post('/', createEmpresaMiembro);  

empresaMiembroRouter.patch('/:id', modifyEmpresaMiembro);  

empresaMiembroRouter.delete('/:id', deleteEmpresaMiembro);  

export default empresaMiembroRouter;