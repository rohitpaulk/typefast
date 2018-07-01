import * as React from 'react';
import './App.css';

import SnippetBox from './components/SnippetBox';
import HiddenTextInput from './components/HiddenTextInput';

interface IAppProps { snippetText: string; }
interface IAppState { typedText: string; }

class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = { typedText: "" }
        this.onTypedTextChange = this.onTypedTextChange.bind(this)
    }

    public onTypedTextChange(newText: string) {
        this.setState({typedText: newText});
    }

    public render() {
        return (
            <div className="app-container">
                <SnippetBox
                    actualText={this.props.snippetText}
                    typedText={this.state.typedText} />
                <HiddenTextInput onChange={this.onTypedTextChange} />
            </div>
        );
    }
}

export default App;
