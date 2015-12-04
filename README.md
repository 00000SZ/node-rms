mean-skeleton
=============

A skeleton for MEAN apps.

* MongoDB / MySQL / PostgreSQL / MSSQL
* Express
* AngularJS
* NodeJS

development
-----------

The project is written to use Mongoose/MySQL/PostgreSQL/MSSQL, Express and AngularJS.
This project has included gulp tasks for most purposes and jasmine-node is used for tests. It assumes
that you have the global install of gulp.

To install everything that you will need, run:

```
npm install
```

To start the server and enable livereloading, as well as on the fly asset
compilation, and testing run:

```
gulp
```

databases
---------

Databases are configured in the [server/config/config.js](server/config/config.js#L40-L57) file.

Supported Database Engines:
  * [mongoose](http://mongoosejs.com/docs/guide.html) - for MongoDB
  * [sequelize](http://docs.sequelizejs.com/en/latest/) - for MySQL, PostgreSQL, MSSQL and SQLite,

Database models and objects are available on the ```db``` object using the ```db[key name][model name]``` format.

```javascript
config.databases = {
  mongo: {
    engine: 'mongoose',
    url: process.env.MONGO_DB_URL || 'mongodb://:@localhost:27017/default',
    dir: 'mongo',
  },
  postgres: {
    engine: 'sequelize',
    url: process.env.POSTGRES_DB_URL || 'postgres://user@localhost:15432/default',
    dir: 'postgres',
    options: {
      define: {
        timestamps: false,
      },
      logging: false,
    }
  },
};
```

For example, the above object would make two database connections available, ```mongo``` and ```postgres```. You can access these from within your controllers like so:

```javascript
module.exports = function(db) {
  var exampleCtrl = {};
  
  exampleCtrl.mongoExample = function(req, res) {
    db.mongo.Example.findAsync().then(function(data) {
      res.json(data);
    }).catch(function(err) {
      res.status(500).json(err);
    });
  };
  
  exampleCtrl.postgresExample = function(req, res) {
    db.postgres.Example.findAll().then(function(data) {
      res.json(data);
    }).catch(function(err) {
      res.status(500).json(err);
    });
  };
  
  return exampleCtrl;
};
```

tests
-----

To run the tests for this application, you will need gulp:

```
gulp test
```

documentation
-------------

Documentation is automatically generated using apidoc. To generate new docs run:

```
gulp apidoc
```
