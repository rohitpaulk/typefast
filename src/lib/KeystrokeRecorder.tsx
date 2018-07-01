interface BackspaceKey { type: "backspace" };
interface CharacterKey { type: "character", character: string };
type Key = BackspaceKey | CharacterKey;


interface IKeystrokeLog {
    key: Key,
    timestamp: Date
}


class KeystrokeRecorder {
    keystrokes: IKeystrokeLog[]

    constructor() {
        this.keystrokes = [];
    }

    public recordCharacter(char: string) {
        this.keystrokes.push({
            key: { type: "character", character: char },
            timestamp: new Date()
        })
    }

    public recordBackspace() {
        this.keystrokes.push({
            key: { type: "backspace" },
            timestamp: new Date()
        })
    }

    public getKeystrokes() {
        return this.keystrokes;
    }
}

export { KeystrokeRecorder, IKeystrokeLog };
