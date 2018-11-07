import CompletedSnippetAnalyzer from "../src/lib/CompletedSnippetAnalyzer";

it('averageSpeed', () => {
    // 60wpm = 300cpm
    // 300cpm = 5cps
    // 5cps = 5c per 1000 ms
    // 5c per 1000 ms = ~ 250 ms delay (excluding first) between each character
    let startTime = new Date()
    let analyzer = new CompletedSnippetAnalyzer("abcde", [
        {key: {type: "character", character: "a"}, timestamp: ms_from_date(startTime, 0) },
        {key: {type: "character", character: "b"}, timestamp: ms_from_date(startTime, 210) },
        {key: {type: "character", character: "c"}, timestamp: ms_from_date(startTime, 390) },
        {key: {type: "character", character: "d"}, timestamp: ms_from_date(startTime, 680) },
        {key: {type: "character", character: "d"}, timestamp: ms_from_date(startTime, 1000) }
    ])

    expect(analyzer.averageSpeed()).toEqual(60);
});

it('mistakeIndices with no mistakes', () => {
    let analyzer = new CompletedSnippetAnalyzer("abcde", [
        {key: {type: "character", character: "a"}, timestamp: new Date() },
        {key: {type: "character", character: "b"}, timestamp: new Date() },
        {key: {type: "character", character: "c"}, timestamp: new Date() },
        {key: {type: "character", character: "d"}, timestamp: new Date() },
        {key: {type: "character", character: "e"}, timestamp: new Date() },
    ])

    expect(analyzer.mistakeIndices()).toEqual([]);
});

it('mistakeIndices with one mistake', () => {
    let analyzer = new CompletedSnippetAnalyzer("abcde", [
        {key: {type: "character", character: "a"}, timestamp: new Date() },
        {key: {type: "character", character: "c"}, timestamp: new Date() },
        {key: {type: "backspace"}, timestamp: new Date() },
        {key: {type: "character", character: "b"}, timestamp: new Date() },
        {key: {type: "character", character: "c"}, timestamp: new Date() },
        {key: {type: "character", character: "d"}, timestamp: new Date() },
        {key: {type: "character", character: "e"}, timestamp: new Date() },
    ])

    expect(analyzer.mistakeIndices()).toEqual([1]);
});

it('mistakeIndices with one mistake', () => {
    let analyzer = new CompletedSnippetAnalyzer("abcde", [
        {key: {type: "character", character: "a"}, timestamp: new Date() },
        {key: {type: "character", character: "c"}, timestamp: new Date() },
        {key: {type: "backspace"}, timestamp: new Date() },
        {key: {type: "character", character: "b"}, timestamp: new Date() },
        {key: {type: "character", character: "f"}, timestamp: new Date() },
        {key: {type: "backspace"}, timestamp: new Date() },
        {key: {type: "character", character: "c"}, timestamp: new Date() },
        {key: {type: "character", character: "d"}, timestamp: new Date() },
        {key: {type: "character", character: "e"}, timestamp: new Date() },
    ])

    expect(analyzer.mistakeIndices()).toEqual([1, 2]);
});

function ms_from_date(date: Date, ms: number): Date {
    let new_date = new Date()
    new_date.setTime(date.getTime() + ms)
    return new_date
}
