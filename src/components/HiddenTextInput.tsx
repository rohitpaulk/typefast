import * as React from 'react';
import './HiddenTextInput.css';

interface IProps {
    onChange: (text: string) => void,
    onCharacterKeypress: (text: string) => void,
    onBackspaceKeypress: () => void,
    maxLength: number,
}
interface IState { text: string; }

class HiddenTextInput extends React.Component<IProps, IState> {
    textInput: any

    constructor(props: IProps) {
        super(props)
        this.state = { text: "" }
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.onBlur = this.onBlur.bind(this)
        this.textInput = React.createRef();
    }

    public componentWillMount() {
        document.addEventListener("keydown", this.handleKeyDown);
        document.addEventListener("keypress", this.handleKeyPress);
    }

    public componentDidMount() {
        this.textInput.current.focus();
    }

    public onBlur() {
        let dis = this;
        setTimeout(function() { dis.textInput.current.focus() }, 1);
    }

    public componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown);
        document.removeEventListener("keypress", this.handleKeyPress);
    }

    public handleKeyDown(e: KeyboardEvent) {
        if (e.key == 'Backspace') {
            this.handleBackspace()
            e.preventDefault()
        }
    }

    public handleKeyPress(e: KeyboardEvent) {
        // Hack! All non-printable chars seem to have a 'key' value that is
        // longer than one character
        if (e.key.length != 1) {
            return
        }

        this.handleCharacter(e.key)
        e.preventDefault()
    }

    public handleBackspace() {
        this.props.onBackspaceKeypress()
        this.changeText(this.state.text.slice(0, -1))
    }

    public handleCharacter(character: string) {
        if (this.isAtMaxLength()) {
            return
        }

        this.props.onCharacterKeypress(character)
        this.changeText(this.state.text + character)
    }

    public changeText(value: string) {
        this.setState({text: value});
        this.props.onChange(value);
    }

    public isAtMaxLength() {
        return this.state.text.length == this.props.maxLength;
    }

    public render() {
        return (
            <input className="hidden-text-input-container"
                   ref={this.textInput}
                   onBlur={this.onBlur}
            />
        );
    }
}

export default HiddenTextInput;
