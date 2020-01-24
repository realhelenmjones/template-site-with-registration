import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';

import './styles.css';
import './bootstrap.min.css';
import App from './components/tmp-app';

if (!process.env.NODE_ENV === 'development')
Sentry.init({dsn: "https://2a12250f407a433da7668f219ef56a55@sentry.io/1872007"});


ReactDOM.render(
<App />,

document.getElementById('root'));

