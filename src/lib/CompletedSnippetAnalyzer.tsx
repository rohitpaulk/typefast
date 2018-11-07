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
        let firstLog = _.first(this.keystrokeLogs)!;
        let lastLog = _.last(this.keystrokeLogs)!;
        let firstLogTimestamp = firstLog.timestamp;
        let lastLogTimestamp = lastLog.timestamp;

        let nTypedChars = this.snippetText.length - 1;
        return calculateWPM(firstLogTimestamp, lastLogTimestamp, nTypedChars);
    }

    public speedsAtIndices(): number[] {
        let groupedLogs = this.logsGroupedBySnippetIndex();

        let finalTimestamps = _.map(groupedLogs, function(
            logs: IKeystrokeLog[],
            snippetIndex
        ) {
            return _.last(logs)!.timestamp;
        });

        let speedsAtIndices = _.map(finalTimestamps, function(
            timestamp,
            snippetIndex
        ) {
            if (snippetIndex == 0) {
                return 0;
            } else {
                return calculateRollingAvgSpeed(
                    finalTimestamps.slice(0, snippetIndex + 1)
                );
            }
        });

        return speedsAtIndices;
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
            remainingLogs = _.drop(remainingLogs, logsForIndex.length);
            if (remainingLogs.length > 0) {
                logsForIndex.push(remainingLogs.shift()!);
            }

            logsGroupedBySnippetIndex[index] = logsForIndex;
        });

        return logsGroupedBySnippetIndex;
    }
}

function calculateRollingAvgSpeed(previousTimestamps: Date[]): number {
    if (previousTimestamps.length > 5) {
        previousTimestamps = previousTimestamps.slice(0, 5);
    }

    let lastTimestamp = _.last(previousTimestamps)!;
    let firstTimestamp = _.first(previousTimestamps)!;
    let charCount = previousTimestamps.length - 1;

    return calculateWPM(firstTimestamp, lastTimestamp, charCount);
}

function calculateWPM(
    firstTimestamp: Date,
    lastTimestamp: Date,
    nTypedChars: number
) {
    let durationMilliseconds =
        lastTimestamp.getTime() - firstTimestamp.getTime();

    let durationMinutes = durationMilliseconds / (1000 * 60);

    let charCount = nTypedChars;
    let cpm = charCount / durationMinutes;

    return Math.round(cpm / 5);
}

export default CompletedSnippetAnalyzer;
