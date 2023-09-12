import { parseBoolean } from '../common/utils/strings';
const environment = process.env;

// Define enum type for the keys
enum EnvironmentConfigKeys {
  environment = "environment",
  port = "port",
  mongoDb = "mongoDb",
  postgresql = "postgresql",
  dbPostgresqlUri = "dbPostgresqlUri",
  mailPassword = "mailPassword",
  mailUser = "mailUser",
  mailFrom = "mailFrom",
  mailIgnoreTls = "mailIgnoreTls",
  mailSecure = "mailSecure",
  mailHost = "mailHost",
  mailPort = "mailPort",
  mailPreview = "mailPreview",
  mailTransport = "mailTransport",
}

export const EnvConfiguration = () => ({
  [EnvironmentConfigKeys.environment]: environment.NODE_ENV || 'dev',
  [EnvironmentConfigKeys.port]: environment.APP_PORT || 3001,
  [EnvironmentConfigKeys.mongoDb]: environment.DB_MONGOOSE_URI,
  [EnvironmentConfigKeys.postgresql]: environment.DB_POSTGRESQL_URI,
  [EnvironmentConfigKeys.dbPostgresqlUri]: environment.DB_POSTGRESQL_URI,
  [EnvironmentConfigKeys.mailPassword]: environment.MAIL_PASSWORD,
  [EnvironmentConfigKeys.mailUser]: environment.MAIL_USER,
  [EnvironmentConfigKeys.mailFrom]: environment.MAIL_FROM,
  [EnvironmentConfigKeys.mailIgnoreTls]: parseBoolean(environment.MAIL_IGNORE_TLS),
  [EnvironmentConfigKeys.mailSecure]: parseBoolean(environment.MAIL_SECURE),
  [EnvironmentConfigKeys.mailHost]: environment.MAIL_HOST,
  [EnvironmentConfigKeys.mailPort]: environment.MAIL_PORT,
  [EnvironmentConfigKeys.mailPreview]: parseBoolean(environment.MAIL_PREVIEW),
  [EnvironmentConfigKeys.mailTransport]: environment.MAIL_TRANSPORT,
});

// Export the enum type
export { EnvironmentConfigKeys as EnumEnvironmentKeys };