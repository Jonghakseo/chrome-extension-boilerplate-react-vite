interface BaseMessage<D = unknown, P = unknown> {
  type: unknown;
  payload?: P;
  response?: D;
}

/**
 * Define the type of messages
 */
export type Message = SearchWeatherMessage | GreetingMessage;

/**
 * If you want to add a new message type, you can add it here.
 */

export interface GreetingMessage extends BaseMessage {
  type: 'Greeting';
  payload: {
    name: string;
  };
  response: string;
}

export interface SearchWeatherMessage extends BaseMessage {
  type: 'SearchWeather';
  payload: {
    search: string;
  };
  response: Array<{
    city: string;
    temperature: number;
    humidity: number;
    description: string;
  }>;
}
