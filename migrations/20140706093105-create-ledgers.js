module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('ledgers', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      hash: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    }).complete(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable('ledgers').complete(done);
  }
}

