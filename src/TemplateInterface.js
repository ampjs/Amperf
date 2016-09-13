class TemplateInterface {
    group(definition) {}

    testItemStart(test_item) {}

    testItemIteration(i) {}

    testItemResults(show, results) {}

    static benchmarkStart() {}

    static benchmarkItem(i, result, threshold) {}

    static benchmarkPasses(passed, count) {}
}

export default TemplateInterface;
