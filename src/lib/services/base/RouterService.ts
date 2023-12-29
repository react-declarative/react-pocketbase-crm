import {
  Action,
  Blocker,
  BrowserHistory,
  Listener,
  State,
  To,
  createMemoryHistory,
} from "history";
import { Source, createWindowHistory } from "react-declarative";
import { makeAutoObservable, toJS } from "mobx";

import { CC_FORCE_MEMORY_HISTORY } from "../../../config/params";

const browserHistory = CC_FORCE_MEMORY_HISTORY
  ? createMemoryHistory()
  : createWindowHistory();

interface Location {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: any;
}

export class RouterService implements BrowserHistory {

  location: Location = browserHistory.location;
  action: Action = browserHistory.action;

  subscribeLeave = (fn: () => void) => {
    return Source.create<void>((next) =>
      this.listen(({ action }) => {
        if (action === "PUSH") {
          next();
        }
      })
    ).once(fn);
  };

  get locationState() {
    if (this.location.state) {
      return toJS(this.location.state);
    }
    return {};
  }

  get path() {
    return this.location?.pathname || "/";
  }

  constructor() {
    makeAutoObservable(this);
  }

  updateState = () => {
    this.location = browserHistory.location;
    this.action = browserHistory.action;
  };

  createHref = (to: To) => {
    const result = browserHistory.createHref(to);
    this.updateState();
    return result;
  };

  push = (to: To, state?: State) => {
    const result = browserHistory.push(to, state);
    this.updateState();
    return result;
  };

  replace = (to: To, state?: State) => {
    const result = browserHistory.replace(to, state);
    this.updateState();
    return result;
  };

  go = (delta: number) => {
    const result = browserHistory.go(delta);
    this.updateState();
    return result;
  };

  back = () => {
    const result = browserHistory.back();
    this.updateState();
    return result;
  };

  forward = () => {
    const result = browserHistory.forward();
    this.updateState();
    return result;
  };

  listen = (listener: Listener) => {
    const result = browserHistory.listen(listener);
    this.updateState();
    return result;
  };

  block = (blocker: Blocker) => {
    const result = browserHistory.block(blocker);
    this.updateState();
    return result;
  };
}

export default RouterService;
