declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    DB_NAME: string;
    DB_USER: string;
    API_SECRET: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_DRIVER: string;
    NODE_ENV: 'development' | 'production' | 'test';
    DB_PORT: string;
  }
}