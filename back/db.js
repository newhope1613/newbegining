import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('expenses', 'postgres', 'Bakosh2002', {
	host: 'localhost',
	dialect: 'postgres',
	define: {
		timestamps: false,
	},
});

export default sequelize;
