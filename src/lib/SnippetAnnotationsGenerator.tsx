import { IKeystrokeLog } from './KeystrokeRecorder';

interface ICompletedSnippetAnnotations {
    averageSpeed: number
}

function getCompletedSnippetAnnotations(
    snippetText: string,
    keystrokeLogs: IKeystrokeLog[]): ICompletedSnippetAnnotations
{
    return {
        averageSpeed: getAverageSpeed(snippetText, keystrokeLogs)
    }
}

function getAverageSpeed(
    snippetText: string,
    keystrokeLogs: IKeystrokeLog[]): number
{
    let firstLogTimestamp = keystrokeLogs[0].timestamp;
    let lastLogTimestamp = keystrokeLogs[keystrokeLogs.length-1].timestamp;

    let durationMilliseconds = firstLogTimestamp.getTime() - lastLogTimestamp.getTime();
    let durationMinutes = durationMilliseconds / (1000 * 60);

    let charCount = snippetText.length;
    let cpm = charCount / durationMinutes;
    return cpm / 5;
}

export default getCompletedSnippetAnnotations;
