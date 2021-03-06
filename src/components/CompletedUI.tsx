import * as React from 'react';

import CompletedSnippetBox from './CompletedSnippetBox';
import ProgressIndicator from './ProgressIndicator';
// import DebugStats from './DebugStats';
import CompletedStats from './CompletedStats';
import { IKeystrokeLog } from '../lib/KeystrokeRecorder';

interface ICompletedUIProps {
    snippetText: string;
    keystrokes: IKeystrokeLog[]
}

class CompletedUI extends React.Component<ICompletedUIProps, {}> {
    public render() {
        return (
            <div className="completed-ui-container">
                <CompletedSnippetBox
                    snippetText={this.props.snippetText}
                    keystrokeLogs={this.props.keystrokes} />
                <ProgressIndicator percentage={100} />
                <CompletedStats
                    snippetText={this.props.snippetText}
                    keystrokes={this.props.keystrokes} />
            { /* <DebugStats
                    snippetText={this.props.snippetText}
                    keystrokes={this.props.keystrokes} /> */ }
            </div>
        );
    }
}

export default CompletedUI;
