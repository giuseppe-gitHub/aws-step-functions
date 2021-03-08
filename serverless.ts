import { hello, init } from '@functions/hello';
import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'aws-step-functions',
  org: 'giuseppeserverless',
  app: 'aws-step-functions-app',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-2',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: "states:StartExecution",
        Resource: "arn:aws:states:eu-west-2:239387378142:stateMachine:My-HelloWorld-StateMachine"
      }
    ]
  },
  // import the function via paths
  functions: { hello, init },
};

module.exports = serverlessConfiguration;
