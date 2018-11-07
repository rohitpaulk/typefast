import CompletedSnippetAnalyzer from "../src/lib/CompletedSnippetAnalyzer";

it('calculates averageSpeed properly', () => {
    let startTime = new Date()
    let analyzer = new CompletedSnippetAnalyzer("abcd", [
        {key: {type: "character", character: "a"}, timestamp: ms_from_date(startTime, 0) },
        {key: {type: "character", character: "b"}, timestamp: ms_from_date(startTime, 5) },
        {key: {type: "character", character: "c"}, timestamp: ms_from_date(startTime, 180) },
        {key: {type: "character", character: "d"}, timestamp: ms_from_date(startTime, 250) }
    ])

    expect(analyzer.averageSpeed()).toEqual(4);

});

function ms_from_date(date: Date, ms: number): Date {
    let new_date = new Date()
    new_date.setTime(date.getTime() + ms)
    return new_date
}
