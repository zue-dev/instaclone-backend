declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string;
    DATABASE_URL: string;
    PORT: string;
    SECRET_KEY: string;
  }
}
