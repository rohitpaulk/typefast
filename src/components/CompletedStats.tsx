import * as React from 'react';
import './CompletedStats.css';

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

    public completedSnippetAnalyzer() {
        return new CompletedSnippetAnalyzer(
            this.props.snippetText,
            this.props.keystrokes
        )
    }

    public getAverageSpeed(): number {
        return this.completedSnippetAnalyzer().averageSpeed()
    }

    public getMistakeCount(): number {
        return this.completedSnippetAnalyzer().mistakeCount()
    }

    public getMistakeText(): string {
        if (this.getMistakeCount() == 1) {
            return `You made 1 mistake.`;
        } else {
            return `You made ${this.getMistakeCount()} mistakes.`;
        }
    }

    public render() {
        return (
            <div className="completed-stats-container">
                Impressive! Your average speed is <b>
                {this.getAverageSpeed()}</b> words per minute. {this.getMistakeText()}
            </div>
        );
    }
}

export default CompletedStats;
