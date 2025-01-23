'use strict';

import { DataTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import AppConfig from '../config';

const sequelize = new Sequelize(
  AppConfig.postgres.db,
  AppConfig.postgres.user,
  AppConfig.postgres.passwd, {
  host: AppConfig.postgres.host,
  port: AppConfig.postgres.port,
  dialect: 'postgres',
});

sequelize.addModels([__dirname + '/../models']);

const db = {
  sequelize,
  Sequelize,
  DataTypes,
};

export default db;
