import { ComponentType, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import i18n from '@/locales/i18n';
import { worker } from '@/mocks/browser';
import { store } from '@/store';
import ThemeProvider from '@/theme/Provider';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

const VITE_MOCK_REQUESTS = JSON.parse(import.meta.env.VITE_MOCK_REQUESTS);

async function prepare(): Promise<ServiceWorkerRegistration | undefined> {
  if (VITE_MOCK_REQUESTS) {
    return worker.start();
  }

  return undefined;
}

function render(App: ComponentType) {
  prepare().then(() => {
    root.render(
      <StrictMode>
        <Provider store={store}>
          <HelmetProvider>
            <ThemeProvider>
              <I18nextProvider i18n={i18n}>
                <App />
              </I18nextProvider>
            </ThemeProvider>
          </HelmetProvider>
        </Provider>
      </StrictMode>,
    );
  });
}

export default render;
