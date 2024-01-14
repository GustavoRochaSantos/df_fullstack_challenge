export interface NestConfig {
  port: number;
}

export interface CorsConfig {
  enabled: boolean;
  methods: string | string[];
  origin: string | string[];
}

export interface HelmetConfig {
  enabled: boolean;
}

export interface SwaggerConfig {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
}

export interface GraphqlConfig {
  playgroundEnabled: boolean;
  debug: boolean;
  schemaDestination: string;
  sortSchema: boolean;
}

export interface SecurityConfig {
  expiresIn: string;
  refreshIn: string;
  bcryptSaltOrRound: string | number;
}

export interface Config {
  nest: NestConfig;
  cors: CorsConfig;
  helmet: HelmetConfig;
  swagger: SwaggerConfig;
  security: SecurityConfig;
}

const config: Config = {
  nest: {
    port: 3000,
  },
  helmet: {
    enabled: true,
  },
  cors: {
    enabled: true,
    methods: ['GET', 'POST', 'PATH', 'DELETE'],
    origin: [process.env.CORS_WEB_URL || 'http://localhost:3001'],
  },
  swagger: {
    enabled: true,
    title: 'DFCom Sistemas',
    description: 'This document list all APIs used at project',
    version: '1.0',
    path: 'api',
  },
  security: {
    expiresIn: '2m',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
  },
};

export default (): Config => config;
