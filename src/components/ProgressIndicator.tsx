import * as React from 'react';
import './ProgressIndicator.css';

interface IProps { actualText: string; typedText: string }

class ProgressIndicator extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props)
    }

    public getProgressPercentage() {
        let actualLength = this.props.actualText.length;
        let typedLength = this.props.typedText.length;

        // TODO: Only count till the first mistake?
        return (typedLength / actualLength) * 100;
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
