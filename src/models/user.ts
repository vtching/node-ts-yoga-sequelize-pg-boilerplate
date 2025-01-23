import { Table, Column, Model } from 'sequelize-typescript';

@Table
export default class User extends Model {
  @Column({
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  })
  email!: string;

  @Column({
    allowNull: false,
  })
  password!: string;
}
