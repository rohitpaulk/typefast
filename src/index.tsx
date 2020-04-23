import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

let text = `Encouraging students to think critically -- to ask, "What
if?" -- is a hallmark of the college writing classroom. Yet in
working-class circles, the willingness to speculate, to bandy about ideas
for their own sake, is suspect. So Julie Lindquist, an assistant professor
of English at the University of Southern Mississippi, discovered when she
began doing ethnographic research in the blue-collar barroom where she had
worked before becoming an academic. Bellying up to the bar at the
Smokehouse, in suburban Chicago, Ms. Lindquist found that the "regulars"
responded with ambivalence to the values she came to represent for them. In
the December issue of College Composition and Communications, Ms. Lindquist
writes "Earning a degree is seen as a route to upward mobility even as
identification with the university is perceived as a kind of cultural
abandonment."`;

// Shorter version for testing
text = `Typefast is a minimalistic distraction-free typing speed test. It tracks your typing speed and mistakes.`;

// // Shortest version for testing
// text = "hey";

text = text.replace(/\n/gm, " ");

ReactDOM.render(
  <App snippetText={text} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
