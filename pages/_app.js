import React from 'react';
import App from 'next/app';
import { Provider } from 'react-redux';
import NProgress from 'nprogress';
import Router from 'next/router';
import Layout from '../components/layout';
import QuicktestTheme from '../components/quicktest-theme';
import { AnimatePresence } from 'framer-motion';
import withRedux from 'next-redux-wrapper';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { initStore } from '../redux';

Router.events.on('routeChangeStart', () => { NProgress.start() })
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())


export default withRedux(initStore, { debug: true})(
  class Quicktest extends App {
    static async getInitialProps({ Component, ctx }) {
      return {
        pageProps: {
          ...(Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {})
        }
      };
    }
    render() {
      const { Component, pageProps, store } = this.props
      return (
        <Provider store={store}>
          <MuiThemeProvider theme={QuicktestTheme}>
            <Layout>
              <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} />
              </AnimatePresence>
            </Layout>
          </MuiThemeProvider>
        </Provider>
      )
    }

  }
);
