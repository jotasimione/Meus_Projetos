module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'dbmeetapp',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
