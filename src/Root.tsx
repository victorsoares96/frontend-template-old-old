import { ComponentType, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import { store } from '@/store';
import ThemeProvider from '@/theme/Provider';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

function render(App: ComponentType) {
  root.render(
    <StrictMode>
      <Provider store={store}>
        <HelmetProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </HelmetProvider>
      </Provider>
    </StrictMode>,
  );
}

export default render;
