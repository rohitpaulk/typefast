import * as React from 'react';
import './SnippetBox.css';

import * as _ from "lodash";

interface ISnippetBoxProps { actualText: string; typedText: string; }

enum CharacterStatus { Correct, Wrong, Untyped };
interface ICharacter { value: string; status: CharacterStatus };

class LiveSnippetBox extends React.Component<ISnippetBoxProps, {}> {
    public getCursorPos(): number {
        return this.props.typedText.length - 1;
    }

    public getCharacters(): ICharacter[] {
        const actualChars = this.props.actualText.split('');
        const typedChars = this.props.typedText.split('');

        let firstMistakePos: number | null = null;
        _.each(actualChars, (value, index) => {
            if (firstMistakePos) {
                return;
            }

            if (typedChars[index] === undefined) {
                return;
            }

            if (typedChars[index] !== actualChars[index]) {
                firstMistakePos = index;
            }
        });

        const cursorPos = this.getCursorPos();
        const characters: ICharacter[] = [];
        _.each(actualChars, function(value, index) {
            let status: CharacterStatus;
            if (index > cursorPos) {
                status = CharacterStatus.Untyped;
            } else if (firstMistakePos && (index >= firstMistakePos)) {
                status = CharacterStatus.Wrong;
            } else {
                status = CharacterStatus.Correct;
            }

            characters.push({ value: value, status: status });
        });

        return characters;
    }

    public getSpans() {
        const cursorPos = this.getCursorPos();
        const spans: JSX.Element[] = [];

        _.each(this.getCharacters(), (character, index) => {
            let spanClass: string;
            switch(character.status) {
                case CharacterStatus.Untyped:
                    spanClass = 'char-untyped';
                    break;
                case CharacterStatus.Wrong:
                    spanClass = 'char-wrong';
                    break;
                case CharacterStatus.Correct:
                    spanClass = 'char-correct';
                    break;
            }

            if (index === cursorPos + 1) {
                spanClass! += " is-cursor";
            }

            spans.push(<span className={spanClass!}>{character.value}</span>);
        });

        return spans
    }

    public render() {
        return (
            <div className="snippet-box-container">
                <div className="snippet-text">
                    { this.getSpans() }
                </div>
            </div>
        );
    }
}

export default LiveSnippetBox;
