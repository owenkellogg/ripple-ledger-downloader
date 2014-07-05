module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Ledgers', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }
    }).complete(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable('Ledgers').complete(done);
  }
}
