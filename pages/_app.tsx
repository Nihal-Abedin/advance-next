import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { store } from '../store/store';
import { Provider, useSelector } from 'react-redux';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useEffect } from 'react';
import { loginActions } from '../store/login-slice';
import { CookiesProvider } from 'react-cookie';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  // const user = useSelector((state: RootState) => state.login);


  return (
    <Provider store={store}>
      <CookiesProvider>

        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </CookiesProvider>
    </Provider>
  )
}

export default MyApp
