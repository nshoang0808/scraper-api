import * as dotenv from 'dotenv'
dotenv.config({ path: `../${process.env.NODE_ENV}.env` })

export const env = {
  APP_PORT: process.env.APP_PORT,
  APP_ENV: process.env.APP_ENV,
  DATABASE: {
    CONNECT: process.env.DATABASE_CONNECT as any,
    HOST: process.env.DATABASE_HOST,
    PORT: Number(process.env.DATABASE_PORT),
    USER: process.env.DATABASE_USER,
    PASSWORD: process.env.DATABASE_PASSWORD,
    NAME: process.env.DATABASE_NAME
  },
  SECRET_KEY: 'secret123',
  CORS_CONFIG: { credentials: true,
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', },
  PUPPETEER_EXECUTABLE_PATH: process.env.PUPPETEER_EXECUTABLE_PATH || ''
};