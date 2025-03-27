import { BlockProps } from "./Block";
import EventBus from "./EventBus";

export enum StoreEvents {
  Updated = "Updated",
}

export default class Store extends EventBus {
  private state = {};
  private static __instance: Store | null = null;

  constructor(defaultState: Record<string, unknown>) {
    if (Store.__instance) {
      return Store.__instance;
    }
    super();

    this.state = defaultState;
    this.setState(defaultState);

    Store.__instance = this;
  }

  public getState() {
    return this.state;
  }

  public setState(nextState: Record<string, unknown>) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}

interface Chat {
  avatar: string | null;
  created_by: number | null;
  id: number | null;
  last_message: Record<string, string> | null;
  title: string | null;
  unread_count: number | null;
}

interface SearchItem {
  avatar: string | null;
  display_name: string | null;
  first_name: string;
  id: number;
  login: string;
  second_name: string;
}

export interface User {
  avatar: string | null;
  display_name: string | null;
  email: string;
  first_name: string;
  second_name: string;
  phone: number;
  login: string;
  id: number;
}
export interface StoreTypes extends BlockProps {
  chats: Chat[] | null;
  currentChat: {
    avatar: string | null;
    chatToken: {
      token: string;
    } | null;
    chatUsers: [] | null;
    created_by: number | null;
    id: number | null;
    last_message: Record<string, string> | null;
    title: string | null;
    unread_count: number | null;
  };
  isLoading: boolean | null;
  loginError: string | null;
  searchResult: SearchItem[];
  user: User;
}
