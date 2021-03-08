import 'source-map-support/register';

import { Handler } from 'aws-lambda';
import * as aws from 'aws-sdk';
import { StepFunctions } from 'aws-sdk';
import { StartExecutionInput } from 'aws-sdk/clients/stepfunctions';
import { JsonPath } from '@aws-cdk/aws-stepfunctions';


const sf = new aws.StepFunctions();

interface ILambdaInput
{
  name: string;
}

export const hello: Handler<ILambdaInput, { message: string }> = async (event) =>
{
  const name = event.name;
  return {
    message: `Hello ${name}, welcome to the exciting Serverless world!`
  };
}

//export const main = middyfy(hello);

export const init: Handler = async (event) => {
  const params: StartExecutionInput = {
    stateMachineArn: 'arn:aws:states:eu-west-2:239387378142:stateMachine:My-HelloWorld-StateMachine',
    input: JSON.stringify({name: 'Giuseppe'}),
    name: 'Execution-Lambda'
  };

  try
  {
    const result = await sf.startExecution(params).promise();

    return {
      statusCode: 200,
      body: result.executionArn
    }
  } catch (e)
  {
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    };
  }
};