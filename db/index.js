const Sequelize = require("sequelize");


const sequelize = new Sequelize({
  dialect: "postgres",
  host: "80.78.251.155",
  port: "6001",
  username: "postgres",
  password: "postgres",
  database: "postgres",
  models: [__dirname + '/models/*.model.*']
});

const initDB = async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.dropSchema('public', {});
    // await sequelize.createSchema('public', {});
    await sequelize.sync();
    console.log('Sequelize was initialized');
  } catch (error) {
    console.log('Sequelize ERROR', error);
    process.exit();
  }
};


module.exports = {
  sequelize,
  initDB,
};

sequelize.sync().then(result=>{
  console.log(result);
})
.catch(err=> console.log(err));



