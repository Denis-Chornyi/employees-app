import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './common/state/store';
import './index.scss';

const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(rootElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
