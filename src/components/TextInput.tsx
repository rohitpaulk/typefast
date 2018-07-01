import * as React from 'react';
import './TextInput.css';

interface IProps { onChange: (text: string) => void }
interface IState { text: string; }

class TextInput extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = { text: "" }
        this.onTextChange = this.onTextChange.bind(this)
    }

    public onTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({text: e.target.value});
        this.props.onChange(e.target.value);
    }

    public render() {
        return (
            <div className="text-input-container">
                <textarea
                    value={this.state.text}
                    onChange={this.onTextChange} />
            </div>
        );
    }
}

export default TextInput;
