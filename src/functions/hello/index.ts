import { handlerPath } from '@libs/handlerResolver';

export const hello = {
  handler: `${handlerPath(__dirname)}/handler.hello`
};


export const init = {
  handler: `${handlerPath(__dirname)}/handler.init`,
  events: [
    {
      http: {
        method: 'get',
        path: 'init'
      }
    }
  ]
};