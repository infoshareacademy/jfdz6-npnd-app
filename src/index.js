import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import Auth from './components/Auth/Auth'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Auth>
        <Route path="/" component={App}/>
      </Auth>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker()
