import SnippetGenerator from "../src/lib/SnippetGenerator";

it("snippetContent", () => {
    let snippets = new SnippetGenerator().getAllSnippets();
    for (let snippet of snippets) {

        for (let item of snippet.split(" ")) {
            expect(item).toMatch(/^[a-zA-Z0-9.!@?#"$%&:';()*\+,\/;\-=[\\\]\^_{|}<>~` ]+$/);
        }
    }
});
