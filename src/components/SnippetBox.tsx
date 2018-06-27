import * as React from 'react';
import './SnippetBox.css';

import * as _ from "lodash";

interface ISnippetBoxProps { actualText: string; typedText: string; }

enum CharacterStatus { Correct, Wrong, Untyped };
interface ICharacter { value: string; status: CharacterStatus };

class SnippetBox extends React.Component<ISnippetBoxProps, {}> {
    public getCharacters(): ICharacter[] {
        const actualChars = this.props.actualText.split('');
        const typedChars = this.props.typedText.split('');

        const zipped = _.zip(actualChars, typedChars);

        const characters = [];
        for (const pair of zipped) {
            const actual = pair[0];
            const typed = pair[1];

            let status: CharacterStatus;
            if (typed === undefined) {
                status = CharacterStatus.Untyped;
            } else if (typed === actual) {
                status = CharacterStatus.Correct;
            } else {
                status = CharacterStatus.Wrong;
            }

            characters.push({ value: actual!, status });
        }

        return characters;
    }

    public getCharacterSpans() {
        const spans = [];
        for (const character of this.getCharacters()) {
            let statusClass: string;
            switch(character.status) {
                case CharacterStatus.Untyped:
                    statusClass = 'char-untyped';
                    break;
                case CharacterStatus.Wrong:
                    statusClass = 'char-wrong';
                    break;
                case CharacterStatus.Correct:
                    statusClass = 'char-correct';
                    break;
            }

            spans.push(<span className={statusClass!}>{character.value}</span>);
        }

        return spans
    }

    public render() {
        return (
            <div className="snippet-box-container">
                <div className="snippet-text">
                    { this.getCharacterSpans() }
                </div>
            </div>
        );
    }
}

export default SnippetBox;
