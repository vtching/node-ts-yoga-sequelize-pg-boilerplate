// Define Application Configuration

const AppConfig = {
  env: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  port: parseInt(process.env.API_PORT || '8080'),
  postgres: {
    db: process.env.DATABASE_NAME || 'myproject',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    host: process.env.DATABASE_HOST || 'myproject-db',
    user: process.env.DATABASE_USER || 'myproject',
    passwd: process.env.DATABASE_PASSWORD || 'myprojectpwd',
    // ssl: 
    // ssl_ca_cert: 
  },
};

export default AppConfig;
