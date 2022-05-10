import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { store } from '../store/store';
import { Provider } from 'react-redux';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
      </QueryClientProvider>
    </Provider>
  )
}

export default MyApp
