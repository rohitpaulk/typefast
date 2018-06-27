import * as React from 'react';
import './App.css';

import SnippetBox from './components/SnippetBox';
import TextInput from './components/TextInput';

class App extends React.Component {
    public render() {
        return (
            <div className="app-container">
                <SnippetBox actualText="This is a snippet" typedText="This ixa"/>
                <TextInput />
            </div>
        );
    }
}

export default App;
