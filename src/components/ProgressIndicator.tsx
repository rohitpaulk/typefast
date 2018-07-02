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

    public getClassNames() {
        if (this.props.percentage == 100) {
            return 'progress-bar completed';
        } else {
            return 'progress-bar'
        }
    }

    public render() {
        return (
            <div className="progress-indicator-container">
                <div className="progress-indicator">
                    <div className={this.getClassNames()} style={this.getStyles()} />
                </div>
            </div>
        );
    }
}

export default ProgressIndicator;
