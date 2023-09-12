export { };

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: number
      DB_MONGOOSE_URI: string
      DB_POSTGRESQL_URI: string
      MAIL_PASSWORD: string
      MAIL_USER: string
      MAIL_FROM: string
      MAIL_IGNORE_TL: string
      MAIL_SECURE: string
      MAIL_HOST: string
      MAIL_PORT: string
      MAIL_PREVIEW: string
      MAIL_TRANSPORT: string
    }
  }
}