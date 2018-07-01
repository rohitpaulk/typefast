import * as React from 'react';
import './ProgressIndicator.css';

import * as _ from "lodash";

interface IProps { actualText: string; typedText: string }

class ProgressIndicator extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props)
    }

    public getProgressPercentage() {
        const actualChars = this.props.actualText.split('');
        const typedChars = this.props.typedText.split('');

        // Duplicated from SnippetBox!
        let completedUntilPos = 0;
        let foundMistake = false;
        _.each(actualChars, (value, index) => {
            if (foundMistake) {
                return;
            }

            if (typedChars[index] === undefined) {
                return;
            }

            if (typedChars[index] !== actualChars[index]) {
                foundMistake = true;
                return;
            }

            completedUntilPos = index;
        });

        return (completedUntilPos / this.props.actualText.length) * 100;
    }

    public getStyles() {
        return {
            'width': this.getProgressPercentage() + '%'
        }
    }

    public render() {
        return (
            <div className="progress-indicator-container">
                <div className="progress-indicator">
                    <div className="progress-bar" style={this.getStyles()} />
                </div>
            </div>
        );
    }
}

export default ProgressIndicator;
