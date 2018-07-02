import * as React from 'react';

import CompletedSnippetBox from './CompletedSnippetBox';
import ProgressIndicator from './ProgressIndicator';
import DebugStats from './DebugStats';
import { IKeystrokeLog } from '../lib/KeystrokeRecorder';

interface ICompletedUIProps {
    snippetText: string;
    keystrokes: IKeystrokeLog[]
}

class CompletedUI extends React.Component<ICompletedUIProps, {}> {
    public render() {
        return (
            <div className="live-ui-container">
                <CompletedSnippetBox
                    snippetText={this.props.snippetText} />
                <ProgressIndicator percentage={100} />
                <DebugStats
                    snippetText={this.props.snippetText}
                    keystrokes={this.props.keystrokes} />
            </div>
        );
    }
}

export default CompletedUI;
