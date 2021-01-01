

module.exports = (sequelize, Sequelize) => {
	const Datum = sequelize.define('data', {	
	  id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
	  username: {
			type: Sequelize.STRING
	  },
	  usertext: {
		  type: Sequelize.STRING
  	}
	});//여기 수정
	
	return Datum;
}