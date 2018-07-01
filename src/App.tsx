import * as React from 'react';
import './App.css';

import SnippetBox from './components/SnippetBox';
import HiddenTextInput from './components/HiddenTextInput';
import ProgressIndicator from './components/ProgressIndicator';

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
                <HiddenTextInput onChange={this.onTypedTextChange} />
                <SnippetBox
                    actualText={this.props.snippetText}
                    typedText={this.state.typedText} />
                <ProgressIndicator
                    actualText={this.props.snippetText}
                    typedText={this.state.typedText} />
            </div>
        );
    }
}

export default App;
