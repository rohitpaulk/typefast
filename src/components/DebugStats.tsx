import * as React from 'react';
import './ProgressIndicator.css';

import { IKeystrokeLog } from '../lib/KeystrokeRecorder';
import CompletedSnippetAnalyzer from '../lib/CompletedSnippetAnalyzer';

interface IProps {
    snippetText: string;
    keystrokes: IKeystrokeLog[]
}

class CompletedStats extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props)
    }

    public completedSnippetAnalyzer(): CompletedSnippetAnalyzer {
        return new CompletedSnippetAnalyzer(
            this.props.snippetText,
            this.props.keystrokes
        )
    }

    public getAverageSpeed(): number {
        return this.completedSnippetAnalyzer().averageSpeed()
    }

    public render() {
        return (
            <div className="debug-stats-container">
                Impressive! Your average speed is
                <b>{this.getAverageSpeed()}</b> words per minute.
            </div>
        );
    }
}

export default CompletedStats;
