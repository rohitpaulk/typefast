import * as React from "react";
import "./App.css";

import LiveUI from "./components/LiveUI";
import CompletedUI from "./components/CompletedUI";
import { IKeystrokeLog } from "./lib/KeystrokeRecorder";
// import DummyKeystrokeLogsFactory from "./lib/DummyKeystrokeLogsFactory";

interface IAppProps {
    snippetText: string;
}
interface IAppState {
    state: "live" | "completed";
    keystrokeLogs?: IKeystrokeLog[];
}

class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = { state: "live" };
        this.onLiveUIFinish = this.onLiveUIFinish.bind(this);

        // Comment this out for a sample 'completed' UI
        // this.state = {
        //     state: "completed",
        //     keystrokeLogs: new DummyKeystrokeLogsFactory().generate(
        //         this.props.snippetText
        //     )
        // };
    }

    public onLiveUIFinish(keystrokeLogs: IKeystrokeLog[]) {
        this.setState({ state: "completed", keystrokeLogs: keystrokeLogs });
    }

    public isLive() {
        return this.state.state === "live";
    }

    public render() {
        let mainUI: JSX.Element;

        if (this.isLive()) {
            mainUI = (
                <LiveUI
                    snippetText={this.props.snippetText}
                    onFinish={this.onLiveUIFinish}
                />
            );
        } else {
            mainUI = (
                <CompletedUI
                    snippetText={this.props.snippetText}
                    keystrokes={this.state.keystrokeLogs!}
                />
            );
        }

        return (
            <div className="app-container">
                <input
                    type="hidden"
                    value={this.props.snippetText}
                    id="raw-snippet"
                />

                {mainUI}
            </div>
        );
    }
}

export default App;
