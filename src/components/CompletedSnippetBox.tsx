import * as React from 'react';
import './SnippetBox.css';

interface ISnippetBoxProps { snippetText: string; }

class CompletedSnippetBox extends React.Component<ISnippetBoxProps, {}> {
    public render() {
        return (
            <div className="snippet-box-container">
                <div className="snippet-text">
                    <div className="completed-text">
                        { this.props.snippetText }
                    </div>
                </div>
            </div>
        );
    }
}

export default CompletedSnippetBox;
