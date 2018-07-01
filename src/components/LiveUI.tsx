import * as React from 'react';

import LiveSnippetBox from './LiveSnippetBox';
import HiddenTextInput from './HiddenTextInput';
import ProgressIndicator from './ProgressIndicator';
import { KeystrokeRecorder } from '../lib/KeystrokeRecorder';

import { IKeystrokeLog } from '../lib/KeystrokeRecorder';

interface ILiveUIProps {
    snippetText: string;
    onFinish: (keystrokes: IKeystrokeLog[]) => void;
}

interface ILiveUIState { typedText: string; }

class LiveUI extends React.Component<ILiveUIProps, ILiveUIState> {
    keystrokeRecorder: KeystrokeRecorder

    constructor(props: ILiveUIProps) {
        super(props);
        this.state = { typedText: "" }
        this.onTypedTextChange = this.onTypedTextChange.bind(this)

        this.keystrokeRecorder = new KeystrokeRecorder()
        this.onCharacterKeypress = this.onCharacterKeypress.bind(this)
        this.onBackspaceKeypress = this.onBackspaceKeypress.bind(this)
    }

    public onTypedTextChange(newText: string) {
        this.setState({typedText: newText});
        this.checkFinish()
    }

    public checkFinish() {
        if (this.state.typedText === this.props.snippetText) {
            this.props.onFinish(this.keystrokeRecorder.getKeystrokes());
        }
    }

    public onCharacterKeypress(character: string) {
        this.keystrokeRecorder.recordCharacter(character);
    }

    public onBackspaceKeypress() {
        this.keystrokeRecorder.recordBackspace();
    }

    public render() {
        return (
            <div className="live-ui-container">
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

export default LiveUI;
