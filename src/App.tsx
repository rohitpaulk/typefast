import * as React from 'react';
import './App.css';

import LiveSnippetBox from './components/LiveSnippetBox';
import HiddenTextInput from './components/HiddenTextInput';
import ProgressIndicator from './components/ProgressIndicator';
import KeystrokeRecorder from './lib/KeystrokeRecorder';

interface IAppProps { snippetText: string; }
interface IAppState { typedText: string; }

class App extends React.Component<IAppProps, IAppState> {
    keystrokeRecorder: KeystrokeRecorder

    constructor(props: IAppProps) {
        super(props);
        this.state = { typedText: "" }
        this.onTypedTextChange = this.onTypedTextChange.bind(this)

        this.keystrokeRecorder = new KeystrokeRecorder()
        this.onCharacterKeypress = this.onCharacterKeypress.bind(this)
        this.onBackspaceKeypress = this.onBackspaceKeypress.bind(this)
    }

    public onTypedTextChange(newText: string) {
        this.setState({typedText: newText});
    }

    public onCharacterKeypress(character: string) {
        this.keystrokeRecorder.recordCharacter(character);
    }

    public onBackspaceKeypress() {
        this.keystrokeRecorder.recordBackspace();
    }

    public render() {
        return (
            <div className="app-container">
                <input
                    type="hidden"
                    value={this.props.snippetText}
                    id="raw-snippet" />

                <HiddenTextInput
                    onChange={this.onTypedTextChange}
                    onCharacterKeypress={this.onCharacterKeypress}
                    onBackspaceKeypress={this.onBackspaceKeypress}
                 />
                <LiveSnippetBox
                    actualText={this.props.snippetText}
                    typedText={this.state.typedText} />
                <ProgressIndicator
                    actualText={this.props.snippetText}
                    typedText={this.state.typedText} />
            </div>
        );
    }
}

export default App;
