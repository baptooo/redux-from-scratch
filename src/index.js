const noop = () => {};

const apply = (reducers, state = {}, action = {}) => {
  let hasChanged = false;

  Object.entries(reducers).forEach(([name, reduce]) => {
    const oldState = state[name];
    const newState = reduce(oldState, action);

    if (oldState !== newState) {
      state[name] = newState;
      hasChanged = true;
    }
  });

  return hasChanged;
};

const createStore = (reducers = {}, state = {}) => {
  let _handler = noop;
  apply(reducers, state);

  return {
    dispatch: (action) => apply(reducers, state, action) && _handler(),
    getState: () => state,
    subscribe: (handler) => _handler = handler,
    unsubscribe: () => _handler = noop
  };
};

export default createStore;