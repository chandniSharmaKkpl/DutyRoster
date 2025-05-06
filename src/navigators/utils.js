/**
 * Used to navigating without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * You can add other navigation functions that you need and export them
 */
import {
  CommonActions,
  createNavigationContainerRef,
} from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

/**
 * Navigation to given screen
 * @param {String} name - name of screen/route
 * @param {Object} params - params with navigation route
 */
export const navigate = (name, params) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

export const navigateAndReset = (routes = [], index = 0) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes,
      })
    );
  }
};

export const navigateAndSimpleReset = (name, index = 0) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{ name }],
      })
    );
  }
};
/**
 * Reset the entire navigation stack and start with given route name
 * @param {Number} index - index for start route
 * @param {Array} routes - array containe route name and params ex. [{name: '', params: {}}]
 */
const reset = (index, routes) => {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index,
      routes,
    })
  );
};

/**
 * It takes you back to the previous route in history
 */
const goBack = () => {
  navigationRef.current.dispatch(CommonActions.goBack());
};

/**
 * It takes you back to a previous screen in the stack
 * @param {Number} count - count for how many screens to pop back by
 */
const pop = (count = 1) => {
  navigationRef.current.dispatch(StackActions.pop(count));
};

/**
 * It takes you back to the first screen in the stack
 */
const popToTop = () => {
  navigationRef.current.dispatch(StackActions.popToTop());
};

/**
 *  It Adds a route on top of the stack and navigates forward to it
 * @param {String} name
 * @param {Object} params
 */
const push = (name, params) => {
  navigationRef.current.dispatch(StackActions.push(name, params));
};

/**
 * It replace a route in the navigation state.
 * @param {String} name
 * @param {Object} params
 */
const replace = (name, params) => {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
};

export { reset, pop, popToTop, goBack, push, replace };
