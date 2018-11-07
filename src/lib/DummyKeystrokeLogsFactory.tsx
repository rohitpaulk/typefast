import { IKeystrokeLog } from "./KeystrokeRecorder";
import * as _ from "lodash";

class DummyKeystrokeLogsFactory {
    generate(snippetText: string): IKeystrokeLog[] {
        let keystrokeLogs: IKeystrokeLog[] = [];
        let chars = snippetText.split("");
        let currentTime = new Date();
        _.each(chars, function(char) {
            let delay = getHumanDelayInMilliseconds();
            currentTime = addMillisecondsToDate(currentTime, delay);
            let keystroke: IKeystrokeLog = {
                key: { type: "character", character: char },
                timestamp: currentTime
            };

            if (Math.random() < 0.03) {
                let mistakeKeystrokes = getMistakeKeystrokes(currentTime);
                keystrokeLogs = keystrokeLogs.concat(mistakeKeystrokes);
                currentTime = _.last(keystrokeLogs)!.timestamp;
            }

            keystrokeLogs.push(keystroke);
        });

        return keystrokeLogs;
    }
}

function getMistakeKeystrokes(startTime: Date): IKeystrokeLog[] {
    let keystrokes: IKeystrokeLog[] = [];

    let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    let mistakeCount = Math.floor(Math.random() * 5);
    let mistakeChars = _.sampleSize(alphabet, mistakeCount);

    let currentTime = startTime;

    _.each(mistakeChars, function(char) {
        let delay = getHumanDelayInMilliseconds();
        currentTime = addMillisecondsToDate(currentTime, delay);

        let keystroke: IKeystrokeLog = {
            key: { type: "character", character: char },
            timestamp: currentTime
        };

        keystrokes.push(keystroke);
    });

    _.each(mistakeChars, function(_) {
        currentTime = addMillisecondsToDate(currentTime, 2);

        let keystroke: IKeystrokeLog = {
            key: { type: "backspace" },
            timestamp: currentTime
        };

        keystrokes.push(keystroke);
    });

    return keystrokes;
}

function getHumanDelayInMilliseconds() {
    let average_wpm = 200;
    let average_cpm = average_wpm * 5;
    let average_cps = average_cpm / 60;
    let delay_seconds = 1 / average_cps;
    let delay_ms = 1000 * delay_seconds;
    return 2 * delay_ms * Math.random();
}

function addMillisecondsToDate(date: Date, ms: number): Date {
    let new_date = new Date();
    new_date.setTime(date.getTime() + ms);
    return new_date;
}

export default DummyKeystrokeLogsFactory;
