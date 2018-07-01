import * as React from 'react';
import './ProgressIndicator.css';

import { IKeystrokeLog } from '../lib/KeystrokeRecorder';
import getCompletedSnippetAnnotations from '../lib/SnippetAnnotationsGenerator';

interface IProps {
    snippetText: string;
    keystrokes: IKeystrokeLog[]
}

class DebugStats extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props)
    }

    public getAverageSpeed(): number {
        let annotations = getCompletedSnippetAnnotations(
            this.props.snippetText,
            this.props.keystrokes
        );

        return annotations.averageSpeed;
    }

    public render() {
        return (
            <div className="debug-stats-container">
                Average WPM: {this.getAverageSpeed()}
            </div>
        );
    }
}

export default DebugStats;
