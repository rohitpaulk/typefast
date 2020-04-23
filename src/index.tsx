import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SnippetGenerator from './lib/SnippetGenerator';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

var text = new SnippetGenerator().getRandomSnippet();

// Shorter version for testing
// text = `Typefast is a minimalistic distraction-free typing speed test. It tracks your typing speed and mistakes.`;

text = text.replace(/\s+/gm, " ");
console.log(text);

ReactDOM.render(
  <App snippetText={text} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
