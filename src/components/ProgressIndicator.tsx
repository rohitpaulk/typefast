import * as React from 'react';
import './ProgressIndicator.css';

interface IProps { percentage: number }

class ProgressIndicator extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props)
    }

    public getStyles() {
        return {
            'width': this.props.percentage + '%'
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
