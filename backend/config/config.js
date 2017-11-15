var config = {

  development: {
    server: {
      port: 3000,
      cluster: 1,
      https:true
    },

    database: {
      max: 10,
      servers: [
        { host: 'rdb.codeunbug.com', port: 28015, user: 'admin', password: 'next@2017' }
        // {host: '127.0.0.1', port: 28015}
      ],
      db: 'aqa_expert'
    },

    oauth: {
      local: {
        provider: 'local'
      },
      facebook: {
        provoider: 'facebook',
        clientId: '1438197499538604',
        clientSecret: 'd39bcc969fab3f784ec24c301535b7a4',
        callbackURL: 'http://localhost:8080/oauth/facebook/callback'
      },
      google: {
        provoider: 'google',
        clientId: '464475406694-skti62k23di8uemcanuc6h6ah5nnl55a.apps.googleusercontent.com',
        clientSecret: '24WehldQ1ZPo2hXCXmxI_FFg',
        callbackURL: 'http://localhost:8080/oauth/google/callback'
      }
    },
    java: true,
    jdbc: [
      {
        name: "mysql",
        driver: "com.mysql.jdbc.Driver",
        url: "jdbc:mysql://db.codeunbug.com:3306/rmut_expert_db",
        user: "test",
        password: "If1C5B13eeNWvyCr"
      },
      {
        name: "mssql",
        driver: "com.microsoft.sqlserver.jdbc.SQLServerDriver",
        url: "jdbc:sqlserver://127.0.0.1:1433;databaseName=AQADB",
        user: "aqa",
        password: "aqa@2017"
      }
      ,
      {
        name: "oracle",
        driver: "oracle.jdbc.OracleDriver",
        url: "jdbc:oracle:thin:@25.32.200.27:1521:gl3d",
        user: "wzeB505",
        password: "acreporter"
      }
    ]
  },

  production: {
    server: {
      port: 8080,
      cluster: 1
    },
    database: {
      servers: [
        { host: 'rdb.codeunbug.com', port: 28015 }
      ],
      db: 'oauth'
    },
    oauth: [
      {
        provider: 'local'
      },
      {
        provoider: 'facebook',
        clientId: '1438197499538604',
        clientSecret: 'd39bcc969fab3f784ec24c301535b7a4',
        callbackURL: 'http://localhost:8080/oauth/facebook/callback'
      },
      {
        provoider: 'google',
        clientId: '464475406694-skti62k23di8uemcanuc6h6ah5nnl55a.apps.googleusercontent.com',
        clientSecret: '24WehldQ1ZPo2hXCXmxI_FFg',
        callbackURL: 'http://localhost:8080/oauth/google/callback'
      }
    ]
  }

};

module.exports = config[process.env.NODE_ENV || 'development'];