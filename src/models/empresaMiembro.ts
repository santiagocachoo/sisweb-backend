import {Table, Model, Column, DataType, PrimaryKey, AutoIncrement} from 'sequelize-typescript'; 
import {Optional} from 'sequelize'; 

interface EmpresaAttributes {
  id_empresa: number;
  nombre: string;
  datos_generales: string;
  correo_electronico: string;
  contacto: string;
  nombre_contacto: string;
  tier_id: number;
  logo: string;
}

interface EmpresaCreationAttributes
  extends Optional<EmpresaAttributes, "id_empresa"> {}

@Table({
  tableName: "empresas",
  timestamps: false,
})
export class EmpresaMiembro extends Model<
  EmpresaAttributes,
  EmpresaCreationAttributes
> { 
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id_empresa!: number;

  @Column(DataType.STRING(100))
  nombre!: string;

  @Column(DataType.TEXT)
  datos_generales!: string;

  @Column(DataType.STRING(150))
  correo_electronico!: string;

  @Column(DataType.STRING(20))
  contacto!: string;

  @Column(DataType.STRING(50))
  nombre_contacto!: string;

  @Column(DataType.INTEGER)
  tier_id!: number;

  @Column(DataType.STRING(250))
  logo!: string;
}