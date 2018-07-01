import * as React from 'react';
import './App.css';

import LiveUI from './components/LiveUI';

interface IAppProps { snippetText: string; }
interface IAppState { state: "live" | "completed" }

class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
    }

    public render() {
        let mainUI = <LiveUI snippetText={this.props.snippetText} />;

        return (
            <div className="app-container">
                <input
                    type="hidden"
                    value={this.props.snippetText}
                    id="raw-snippet" />

                {mainUI}
            </div>
        );
    }
}

export default App;
