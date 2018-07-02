import * as React from 'react';
import './SnippetBox.css';

import LiveSnippetAnalyzer from '../lib/LiveSnippetAnalyzer';

import * as _ from "lodash";

interface ISnippetBoxProps { actualText: string; typedText: string; }

enum CharacterStatus { Correct, Wrong, Untyped };
interface ICharacter { value: string; status: CharacterStatus };

class LiveSnippetBox extends React.Component<ISnippetBoxProps, {}> {
    public constructor(props: ISnippetBoxProps) {
        super(props)
    }

    public liveSnippetAnalyzer(): LiveSnippetAnalyzer {
        return new LiveSnippetAnalyzer(
            this.props.actualText,
            this.props.typedText
        )
    }

    public getCursorIndex(): number {
        return this.liveSnippetAnalyzer().cursorIndex()
    }

    public getFirstMistakeIndex(): number | null {
        return this.liveSnippetAnalyzer().firstMistakeIndex()
    }

    public getCharacters(): ICharacter[] {
        const actualChars = this.props.actualText.split('');
        const firstMistakePos = this.getFirstMistakeIndex()
        const cursorPos = this.getCursorIndex();

        const characters: ICharacter[] = [];
        _.each(actualChars, function(value, index) {
            let status: CharacterStatus;
            if (index > cursorPos) {
                status = CharacterStatus.Untyped;
            } else if (firstMistakePos != null && (index >= firstMistakePos)) {
                status = CharacterStatus.Wrong;
            } else {
                status = CharacterStatus.Correct;
            }

            characters.push({ value: value, status: status });
        });

        return characters;
    }

    public getSpans() {
        const cursorPos = this.getCursorIndex();
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
