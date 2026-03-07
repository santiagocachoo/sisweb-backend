import { Router, Request, Response } from 'express';
import productRoutes from './productRoutes';  
import empresaMiembroRoutes from './empresaMiembroRoutes';

const apiRouter:Router = Router();  

apiRouter.use('/product', productRoutes);  
apiRouter.use('/empresa-miembro', empresaMiembroRoutes);

apiRouter.get('/', (req:Request, res: Response) => {  
res.send('que pedo!')  
})  

export default apiRouter; 