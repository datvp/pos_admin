import { AppNavigator } from '../Navigation/AppNavigation';

export const reducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};
