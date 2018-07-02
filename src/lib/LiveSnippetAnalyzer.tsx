import * as _ from "lodash";

class LiveSnippetAnalyzer {
    actualText: string
    typedText: string

    constructor(actualText: string, typedText: string) {
        this.actualText = actualText;
        this.typedText = typedText;
    }

    public firstMistakeIndex(): number | null {
        const actualChars = this.actualText.split('');
        const typedChars = this.typedText.split('');

        let firstMistakeIndex: number | null = null;
        _.each(actualChars, (value, index) => {
            if (firstMistakeIndex) {
                return;
            }

            if (typedChars[index] === undefined) {
                return;
            }

            if (typedChars[index] !== actualChars[index]) {
                firstMistakeIndex = index;
            }
        });

        return firstMistakeIndex
    }

    public cursorIndex() {
        return this.typedText.length - 1;
    }

    public percentageCompleted(): number {
        // TODO: Simplify this to use cursor / firstMistake?
        const actualChars = this.actualText.split('');
        const typedChars = this.typedText.split('');

        let completedUntilPos = -1;
        let foundMistake = false;
        _.each(actualChars, (value, index) => {
            if (foundMistake) {
                return;
            }

            if (typedChars[index] === undefined) {
                return;
            }

            if (typedChars[index] !== actualChars[index]) {
                foundMistake = true;
                return;
            }

            completedUntilPos = index;
        });

        return ((completedUntilPos + 1) / this.actualText.length) * 100;
    }

    public isFinished() {
        return this.percentageCompleted() == 100;
    }
}

export default LiveSnippetAnalyzer;
