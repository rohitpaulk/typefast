import { IKeystrokeLog } from "./KeystrokeRecorder";
import * as _ from "lodash";

class CompletedSnippetAnalyzer {
    snippetText: string;
    keystrokeLogs: IKeystrokeLog[];

    constructor(snippetText: string, keystrokeLogs: IKeystrokeLog[]) {
        this.snippetText = snippetText;
        this.keystrokeLogs = keystrokeLogs;
    }

    public averageSpeed(): number {
        let firstLog = this.keystrokeLogs[0];
        let lastLog = this.keystrokeLogs[this.keystrokeLogs.length - 1];
        let firstLogTimestamp = firstLog.timestamp;
        let lastLogTimestamp = lastLog.timestamp;

        let durationMilliseconds =
            lastLogTimestamp.getTime() - firstLogTimestamp.getTime();
        let durationMinutes = durationMilliseconds / (1000 * 60);

        let charCount = this.snippetText.length;
        let cpm = charCount / durationMinutes;

        return Math.round(cpm / 5);
    }

    public speedsAtIndices(): number[] {
        return [0];
    }

    public mistakeIndices(): number[] {
        var mistakeIndices: number[] = [];
        let groupedLogs = this.logsGroupedBySnippetIndex();

        _.forEach(groupedLogs, function(logs, snippetIndex) {
            if (_.some(logs, log => log.key.type == "backspace")) {
                mistakeIndices.push(snippetIndex);
            }
        });

        return mistakeIndices;
    }

    public mistakeCount(): number {
        return this.mistakeIndices().length;
    }

    public logsGroupedBySnippetIndex(): IKeystrokeLog[][] {
        let logsGroupedBySnippetIndex: IKeystrokeLog[][] = [];
        let remainingLogs: IKeystrokeLog[] = this.keystrokeLogs.slice();
        let snippetChars = this.snippetText.split("");
        _.forEach(snippetChars, function(char, index) {
            let doesNotMatchChar = function(log: IKeystrokeLog): boolean {
                return !(
                    log.key.type == "character" && log.key.character == char
                );
            };

            let logsForIndex = _.takeWhile(remainingLogs, doesNotMatchChar);
            if (remainingLogs.length > 0) {
                logsForIndex.push(remainingLogs.shift()!);
            }

            logsGroupedBySnippetIndex[index] = logsForIndex;
            remainingLogs = _.drop(remainingLogs, logsForIndex.length);
        });

        return logsGroupedBySnippetIndex;
    }
}

export default CompletedSnippetAnalyzer;
