import { DataTypes } from 'sequelize';
import sequelize from './db.js';

export const Transaction = sequelize.define('transactions', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	datetime: {
		type: DataTypes.DATE,
	},
	author: {
		type: DataTypes.STRING,
	},
	sum: {
		type: DataTypes.DECIMAL(10, 2),
	},
	category: {
		type: DataTypes.STRING,
	},
	comment: {
		type: DataTypes.STRING,
	},
});

// `sequelize.define` also returns the model
console.log(Transaction === sequelize.models.transaction); // true
