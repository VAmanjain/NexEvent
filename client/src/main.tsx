import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store'; // Adjust the path as necessary
import { checkAuth} from './redux/slices/authSlice.ts';

store.dispatch(checkAuth());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <Provider store={store}>
    <App />
  </Provider>
    {/* <App /> */}
  </StrictMode>,
)
