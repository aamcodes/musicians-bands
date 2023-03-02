const { Sequelize, sequelize } = require('./db');

// TODO - define the Band model
let Song = sequelize.define('songs', {
	title: Sequelize.STRING,
	year: Sequelize.INTEGER,
});

module.exports = {
	Song,
};
