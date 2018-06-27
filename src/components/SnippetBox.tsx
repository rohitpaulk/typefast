import * as React from 'react';
import './SnippetBox.css';

interface ISnippetBoxProps { actualText: string; typedText: string; }

enum CharacterStatus { Correct, Wrong, Untyped };
interface ICharacter { value: string; status: CharacterStatus };

class SnippetBox extends React.Component<ISnippetBoxProps, {}> {
    public getCharacters() {
        let actualText = this.props.actualText;
        let typedText = this.props.typedText;

        for (let i = 0; i < typedText.length; i++) {
        }

        return 'hey'
    }

    public render() {
        return (
            <div className="snippet-box-container">
                <div className="snippet-text">
                    { this.getCharacters() }
                </div>
            </div>
        );
    }
}

export default SnippetBox;
