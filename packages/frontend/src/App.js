import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import RepoList from './containers/RepoList';
import ErrorBoundary from './components/ErrorBoundary';
import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(thunk));

const App = () => (
  <Provider store={store}>
    <ErrorBoundary>
      <RepoList username="petetnt" />
    </ErrorBoundary>
  </Provider>
);

export default App;
