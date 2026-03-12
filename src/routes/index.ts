import { Router, Request, Response } from 'express';
import empresaMiembroRoutes from './empresaMiembroRoutes';
import tierRoutes from './tierRoutes';

const apiRouter:Router = Router();  

apiRouter.use('/empresa-miembro', empresaMiembroRoutes);
apiRouter.use('/tier', tierRoutes);

apiRouter.get('/', (req:Request, res: Response) => {  
res.send('que onda!')  
})  

export default apiRouter; 