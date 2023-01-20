import makeStore from "../context/makeStore";

const layoutReducer = (state, action) => {
  switch (action.type) {
    case "menuToggled":
    // ...state
  }
};

const [LayoutProvider, useLayout, useLayoutDispatch] = makeStore(
  layoutReducer,
  []
);

export { LayoutProvider, useLayout, useLayoutDispatch };
