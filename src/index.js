import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from './auth/react-auth0-wrapper';
import config from './auth/auth_config.json';

// Routes the user to the right place after login
const onRedirectCallback = (appState) => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <BrowserRouter>
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      audience={config.audience}
      redirect_uri={config.redirect_uri}
      onRedirectCallback={onRedirectCallback}
    >
      <App />
    </Auth0Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
