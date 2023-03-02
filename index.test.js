const { sequelize } = require('./db');
const { Band, Musician, Song } = require('./index');

describe('Band and Musician Models', () => {
	/**
	 * Runs the code prior to all tests
	 */
	beforeEach(async () => {
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
		let musician = await Musician.create({
			name: 'Aaron',
			instrument: 'Guns',
		});
		expect(musician).toBeInstanceOf(Object);
		expect(musician.name).toBe('Aaron');
		expect(musician.instrument).toEqual('Guns');
	});

	test('associations for bands and musicians works properly', async () => {
		let newBand = await Band.create({
			name: 'Aaron',
			genre: 'War',
		});
		let musician = await Musician.create({
			name: 'Aaron',
			instrument: 'Guns',
			bandId: newBand.id,
		});
		let findBandId = await (
			await Band.findByPk(musician.dataValues.bandId)
		).dataValues.name;
		expect(findBandId).toBe('Aaron');
	});

	test('band with songs many-to-many associations works properly', async () => {
		let newBand = await Band.create({
			name: 'Aaron',
			genre: 'War',
		});
		let newSong = await Song.create({
			title: 'W4R',
			year: 2023,
		});
		let foundBand = await Band.findByPk(newBand.dataValues.id);
		let foundSong = await Song.findByPk(newSong.dataValues.id);
		await foundBand.addSong(foundSong.dataValues.id);
		let findSongsByBand = await foundBand.getSongs();
		let obj = findSongsByBand[0].dataValues;
		expect(obj.title).toBe('W4R');
	});

	test('song with bands many-to-many associations works properly', async () => {
		let newBand = await Band.create({
			name: 'Aaron',
			genre: 'War',
		});
		let newSong = await Song.create({
			title: 'W4R',
			year: 2023,
		});
		let foundBand = await Band.findByPk(newBand.dataValues.id);
		let foundSong = await Song.findByPk(newSong.dataValues.id);
		await foundSong.addBand(foundBand.dataValues.id);
		let findBandBySongs = await foundSong.getBands();
		let obj = findBandBySongs[0].dataValues;
		expect(obj.name).toBe('Aaron');
	});

	test('eager loading works properly', async () => {
		// create to db
		let band = await Band.create({
			name: 'Tornado',
			genre: 'War',
		});
		let musician = await Musician.create({
			name: 'Aaron',
			instrument: 'Guns',
		});
		let song = await Song.create({
			title: 'W4R',
			year: 2023,
		});

		// confirm in DB
		let foundBand = await Band.findByPk(band.dataValues.id);
		let foundMusician = await Musician.findByPk(musician.dataValues.id);
		let foundSong = await Song.findByPk(song.dataValues.id);
		await foundBand.addMusician(foundMusician.dataValues.id);
		await foundBand.addSong(foundSong.dataValues.id);

		let data = await Band.findAll({
			include: [
				{ model: Musician, as: 'musicians' },
				{ model: Song, as: 'songs' },
			],
		});
		expect(data[0].dataValues.musicians.length).toBe(1);
		expect(data[0].dataValues.songs.length).toBe(1);
	});
});
