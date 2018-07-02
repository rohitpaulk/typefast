import { IKeystrokeLog } from './KeystrokeRecorder';

class CompletedSnippetAnalyzer {
    snippetText: string
    keystrokeLogs: IKeystrokeLog[]

    constructor(snippetText: string, keystrokeLogs: IKeystrokeLog[]) {
        this.snippetText = snippetText;
        this.keystrokeLogs = keystrokeLogs;
    }

    public averageSpeed(): number {
        let firstLog = this.keystrokeLogs[0];
        let lastLog = this.keystrokeLogs[this.keystrokeLogs.length-1]
        let firstLogTimestamp = firstLog.timestamp;
        let lastLogTimestamp = lastLog.timestamp;

        let durationMilliseconds = lastLogTimestamp.getTime() - firstLogTimestamp.getTime();
        let durationMinutes = durationMilliseconds / (1000 * 60);

        let charCount = this.snippetText.length;
        let cpm = charCount / durationMinutes;

        return Math.round(cpm / 5);
    }
}

export default CompletedSnippetAnalyzer;
