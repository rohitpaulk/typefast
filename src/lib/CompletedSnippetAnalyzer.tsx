import { IKeystrokeLog } from './KeystrokeRecorder';
import * as _ from "lodash";

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

    public mistakeIndices(): number[] {
        var currentIndex = 0;
        var mistakeIndices: number[] = [];
        var lastIndexWasMistake = false;
        _.forEach(this.keystrokeLogs, function(log) {
            if (log.key.type == "backspace" && !lastIndexWasMistake) {
                mistakeIndices.push(currentIndex - 1)
            }

            if (log.key.type == "character") {
                lastIndexWasMistake = false;
                currentIndex += 1;
            } else if (log.key.type == "backspace") {
                currentIndex -= 1;
                lastIndexWasMistake = true;
            }
        });

        return mistakeIndices;
    }

    public mistakeCount(): number {
        return this.mistakeIndices().length;
    }
}

export default CompletedSnippetAnalyzer;
