const { Sequelize, sequelize } = require('./db');

// TODO - define the Musician model
let Musician = sequelize.define('musicians', {
	name: Sequelize.STRING,
	instrument: Sequelize.STRING,
});

module.exports = {
	Musician,
};
