import { globalStyles } from "../shared/styles";
import { Provider } from "react-redux";
import { storeWrapper } from "../store";

const App = ({ Component, ...rest }) => {
  const { store, props } = storeWrapper.useWrappedStore(rest);

  return (
    <>
      {globalStyles}
      <Provider store={store}>
        <Component {...props.pageProps} />
      </Provider>
    </>
  );
};

export default App;
