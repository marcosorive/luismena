
module.exports = ({ env }) => {
  const mysqlSettings = {
    client: "mysql",
    host: env("DATABASE_HOST"),
    database: env("DATABASE_NAME"),
    username: env("DATABASE_USER"),
    password: env("DATABASE_PASSWORD"),
    ssl: { rejectUnauthorized: true }
  }


  const sqliteSettings = {
    client: 'sqlite',
    filename: '.tmp/data.db'
  }

  const shouldUseSqlite = Boolean(process.env.DATABASE_TYPE_SQLITE === 'true');
  const dbSettings = shouldUseSqlite ? sqliteSettings : mysqlSettings;
  console.log(`Using ${dbSettings.client} as database`)
  return {
    defaultConnection: 'default',
    connections: {
      default: {
        connector: 'bookshelf',
        settings: dbSettings,
        options: {
          useNullAsDefault: true,
        },
      },
    }
  }
};





