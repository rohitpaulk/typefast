import * as React from 'react';

import LiveSnippetBox from './LiveSnippetBox';
import HiddenTextInput from './HiddenTextInput';
import ProgressIndicator from './ProgressIndicator';
import { KeystrokeRecorder } from '../lib/KeystrokeRecorder';
import LiveSnippetAnalyzer from '../lib/LiveSnippetAnalyzer';

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

    public liveSnippetAnalyzer(): LiveSnippetAnalyzer {
        return new LiveSnippetAnalyzer(
            this.props.snippetText,
            this.state.typedText
        )
    }

    public onTypedTextChange(newText: string) {
        this.setState({typedText: newText});
        this.checkFinish()
    }

    public checkFinish() {
        if (this.liveSnippetAnalyzer().isFinished()) {
            this.props.onFinish(this.keystrokeRecorder.getKeystrokes());
        }
    }

    public onCharacterKeypress(character: string) {
        this.keystrokeRecorder.recordCharacter(character);
    }

    public onBackspaceKeypress() {
        this.keystrokeRecorder.recordBackspace();
    }

    public percentageCompleted() {
        return this.liveSnippetAnalyzer().percentageCompleted();
    }

    public render() {
        return (
            <div className="live-ui-container">
                <HiddenTextInput
                    maxLength={this.props.snippetText.length}
                    onChange={this.onTypedTextChange}
                    onCharacterKeypress={this.onCharacterKeypress}
                    onBackspaceKeypress={this.onBackspaceKeypress}
                 />
                <LiveSnippetBox
                    actualText={this.props.snippetText}
                    typedText={this.state.typedText} />
                <ProgressIndicator percentage={this.percentageCompleted()} />
            </div>
        );
    }
}

export default LiveUI;
