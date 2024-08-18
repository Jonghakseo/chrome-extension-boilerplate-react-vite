interface BaseMessage<D = unknown, P = unknown> {
  type: unknown;
  payload?: P;
  response: D;
}

export type Message = SidePanelMessage | SearchWeatherMessage;

export interface SidePanelMessage extends BaseMessage {
  type: 'SidePanel';
  payload: {
    open: boolean;
  };
}

export interface SearchWeatherMessage extends BaseMessage {
  type: 'SearchWeather';
  payload: {
    search: string;
  };
  response: {
    city: string;
    temperature: number;
    humidity: number;
    description: string;
  };
}
