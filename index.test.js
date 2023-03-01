const { sequelize } = require('./db');
const { Band, Musician } = require('./index');

describe('Band and Musician Models', () => {
	/**
	 * Runs the code prior to all tests
	 */
	beforeAll(async () => {
		// the 'sync' method will create tables based on the model class
		// by setting 'force:true' the tables are recreated each time the
		// test suite is run
		await sequelize.sync({ force: true });
	});

	test('can create a Band', async () => {
		// TODO - test creating a band
		let newBand = await Band.create({
			name: 'The Aarons',
			genre: 'Cyberpunk',
		});
		expect(newBand).toBeInstanceOf(Object);
		expect(newBand.name).toBe('The Aarons');
		expect(newBand.genre).toEqual('Cyberpunk');
	});

	test('can create a Musician', async () => {
		// TODO - test creating a musician
		let newBand = await Musician.create({
			name: 'Aaron',
			instrument: 'Guns',
		});
		expect(newBand).toBeInstanceOf(Object);
		expect(newBand.name).toBe('Aaron');
		expect(newBand.instrument).toEqual('Guns');
	});
});
