import * as React from 'react';
import './HiddenTextInput.css';

interface IProps {
    onChange: (text: string) => void,
    onCharacterKeypress: (text: string) => void,
    onBackspaceKeypress: () => void
}
interface IState { text: string; }

class HiddenTextInput extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = { text: "" }
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
    }

    public componentWillMount() {
        document.addEventListener("keydown", this.handleKeyDown);
        document.addEventListener("keypress", this.handleKeyPress);
    }

    public componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown);
        document.removeEventListener("keypress", this.handleKeyPress);
    }

    public handleKeyDown(e: KeyboardEvent) {
        if (e.key == 'Backspace') {
            this.handleBackspace()
        }
    }

    public handleKeyPress(e: KeyboardEvent) {
        // Hack! All non-printable chars seem to have a 'key' value that is
        // longer than one character
        if (e.key.length == 1) {
            this.handleCharacter(e.key)
        }
    }

    public handleBackspace() {
        this.props.onBackspaceKeypress()
        this.changeText(this.state.text.slice(0, -1))
    }

    public handleCharacter(character: string) {
        this.props.onCharacterKeypress(character)
        this.changeText(this.state.text + character)
    }

    public changeText(value: string) {
        this.setState({text: value});
        this.props.onChange(value);
    }

    public render() {
        return (
            <div className="hidden-text-input-container" />
        );
    }
}

export default HiddenTextInput;
