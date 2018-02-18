import createStore from './index';

const counter = (state = { value: 0 }, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return { value: state.value + 1 };
    case 'DECREMENT':
      return { value: state.value - 1 };
    default:
      return state;
  }
};

describe('API', () => {
  describe('init', () => {
    const store = createStore();

    it('should return an object', () => {
      expect(typeof store).toEqual('object');
    });

    it('should have a dispatch function', () => {
      expect(store.dispatch).toBeDefined();
      expect(typeof store.dispatch).toEqual('function');
    });

    it('should have a getState function', () => {
      expect(store.getState).toBeDefined();
      expect(typeof store.getState).toEqual('function');
    });
  });

  describe('getState', () => {
    it('should return my initial state', () => {
      const store = createStore({}, { foo: 'bar' });

      expect(store.getState()).toMatchSnapshot();
    });

    it('should return my reducer initial state', () => {
      const store = createStore({ counter });

      expect(store.getState()).toMatchSnapshot();
    });

    it('should override my reducer state', () => {
      const store = createStore({ counter }, { counter: { value: 2 }});

      expect(store.getState()).toMatchSnapshot();
    });
  });

  describe('dispatch', () => {
    const store = createStore({ counter });

    it('should increment my counter', () => {
      store.dispatch({ type: 'INCREMENT' });

      expect(store.getState()).toMatchSnapshot();
    });

    it('should decrement my counter', () => {
      store.dispatch({ type: 'DECREMENT' });

      expect(store.getState()).toMatchSnapshot();
    });
  });

  describe('subscribe', () => {
    const store = createStore({ counter });

    it('should call', () => {
      const _handler = jest.fn();
      store.subscribe(_handler);

      store.dispatch({ type: 'INCREMENT' });
      expect(_handler).toHaveBeenCalled();
    });

    it('should not cal', () => {
      const _handler = jest.fn();
      store.subscribe(_handler);

      store.dispatch({});
      expect(_handler).not.toHaveBeenCalled();
    });
  });

  describe('unsubscribe', () => {
    const store = createStore({ counter });
    const _handler = jest.fn();

    it('should call', () => {
      store.subscribe(_handler);

      store.dispatch({ type: 'INCREMENT' });
      expect(_handler.mock.calls.length).toBe(1);
    });

    it('should not call', () => {
      store.unsubscribe();

      store.dispatch({ type: 'INCREMENT' });
      expect(_handler.mock.calls.length).toBe(1);
    });
  });
});