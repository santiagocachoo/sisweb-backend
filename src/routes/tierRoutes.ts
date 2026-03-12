import { Router, Request, Response } from 'express';  
import { createTier,
    getAllTiers,
    getTierById,
    modifyTier,
    deleteTier
 } from '../controllers/tierController';

const tierRouter:Router = Router();  

tierRouter.get('/', getAllTiers);  

tierRouter.get('/:id', getTierById);  

tierRouter.post('/', createTier);  

tierRouter.patch('/:id', modifyTier);  

tierRouter.delete('/:id', deleteTier);  

export default tierRouter;