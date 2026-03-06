import {Table, Model, Column, CreatedAt, UpdatedAt, DataType} from 'sequelize-typescript'; 
import {Optional} from 'sequelize'; 

interface EmpresaMiembroAttributes{ 
  id: number; 
  name: string; 
  sector: string; 
  contactEmail: string ; 
  phone: string ; 
  isActive: boolean ; 
} 

interface EmpresaMiembroCreationAttributes extends Optional<EmpresaMiembroAttributes, 'id'>{} 

@Table ({ 
  tableName: "EmpresaMiembros" 
}) 
export class EmpresaMiembro extends Model<EmpresaMiembroAttributes, EmpresaMiembroCreationAttributes>{ 


// Here, TS infers Data Type from the JS Type 
  // The ! means that the variable NAME wont be null or undefine.  
   @Column 
   name!: string; 

  // Here, we set the Data Type explicity 
  // CAMBIAR ! POR ? SIGNIFICA QUE PUEDE SER NULL O UNDEFINED
   @Column({ 
      type: DataType.STRING 
   }) 
   sector!: string; 

   @Column 
   contactEmail!: string; 

   @Column 
   phone!: string; 

   @Column 
   isActive!: boolean; 

   @CreatedAt 
   @Column 
   createdAt!: Date; 

   @UpdatedAt 
   @Column 
   updatedAt!: Date; 
} 