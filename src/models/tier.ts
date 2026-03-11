import {Table, Model, Column, DataType, PrimaryKey, AutoIncrement, HasMany} from 'sequelize-typescript'; 
import { Optional } from 'sequelize';
import { EmpresaMiembro } from './empresaMiembro';

interface TierAttributes {
  id_tier: number;
  nombre_tier: string;
}

interface TierCreationAttributes
  extends Optional<TierAttributes, "id_tier"> {}

@Table({
  tableName: "tiers",
  timestamps: false,
})
export class Tier extends Model<
  TierAttributes,
  TierCreationAttributes
> { 
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id_tier!: number;

  @Column(DataType.STRING(50))
  nombre_tier!: string;

  @HasMany(() => EmpresaMiembro)
  empresas?: EmpresaMiembro[];
}