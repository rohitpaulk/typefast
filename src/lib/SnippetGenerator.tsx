class SnippetGenerator {
    rawSnippets = [
        `Twenty years from now you will be more disappointed by the things that you
        didn't do than by the ones you did do. So, throw off the bowlines, sail away
        from safe harbor, catch the trade winds in your sails. Explore, Dream,
        Discover.`,

        `First, have a definite, clear practical ideal; a goal, an objective. Second,
        have the necessary means to achieve your ends; wisdom, money, materials, and
        methods. Third, adjust all your means to that end.`,

        `Would you like me to give you a formula for success? It's quite simple,
        really: Double your rate of failure. You are thinking of failure as the enemy
        of success. But it isn't at all. You can be discouraged by failure or you can
        learn from it, so go ahead and make mistakes. Make all you can. Because
        remember that's where you will find success.`,
    ];

    public getRandomSnippet(): string {
        var rawText = this.rawSnippets[Math.floor(Math.random()*this.rawSnippets.length)];
        return this.formatSnippet(rawText)
    }

    public getAllSnippets(): string[] {
        let dis = this;
        return this.rawSnippets.map(function(x) { return dis.formatSnippet(x) });
    }

    private formatSnippet(rawText: string): string {
        return rawText.replace(/\s+/gm, " ");
    }
}

export default SnippetGenerator;
