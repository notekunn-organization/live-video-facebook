const Facebook = require("../src/facebook");
const chai = require('chai'),
    assert = chai.assert,
    should = chai.should();
const tokens = [
    "sads",
    "EAAEhscicJa4BADTHiuQhGkt5D0M72G0M2SJciR87mFZAIrJ8SUWqUXVMK7s6VgVbfzqBCZALUDDoKFr176ZBa3CEqhfenZAITR0vNL3OqDjGosRt5O8SxFgpmhwnYnToGMtFxXrFk0mNvQ2Vqb98E9v2wZBNvje9ZBM9As30ljJ4N8Az0q98hNLcZBYnds89zTuhZBzLJn6ltz9pAbNQ85CNZBTPNlO0TfEOjeoWX2ZC4elwZDZD",
    "EAAEhscicJa4BADTHiuQhGkt5D0M72G0M2SJsiR87mFZAIrJ8SUWqUXVMK7s6VgVbfzqBCZALUDDoKFr176ZBa3CEqhfenZAITR0vNL3OqDjGosRt5O8SxFgpmhwnYnToGMtFxXrFk0mNvQ2Vqb98E9v2wZBNvje9ZBM9As30ljJ4N8Az0q98hNLcZBYnds89zTuhZBzLJn6ltz9pAbNQ85CNZBTPNlO0TfEOjeoWX2ZC4elwZDZD"
];
describe('Facebook', function() {
    this.timeout(5000);
    describe('Check token', function() {
        tokens.forEach((token, i) => {
            it(`#${i + 1}`, function(done) {
                const facebook = new Facebook(token);
                facebook.validate().then(validate => {
                    if (typeof validate === "boolean") done();
                })
            })
        })
    });
    describe('GET ID', function() {
        it(`Check id of token`, function() {
            const facebook = new Facebook("EAAEhscicJa4BAJ5j5a8q1iuvPdV8TYZBGE9qLFnNOFr4bPFgL0UbX6DpKbjksltDIUTNpsox4epDzPCyM3EhZA4JBg2fU6enpuYZBkeAAfRN9NmaQAkWLitJ8ZCOTDNHtu3D84JvpzJSRX2Su0MwBS7bm7qv3U2V8V3706vdgfRWplCL4QxWaZC8Nc0YherNNyV1AmbTVI1WRSAZAA3lf5LyrwULyb1FCry1PLUWM76wZDZD");
            facebook.getID().then(id => {
                id.should.be.equals(565083350496981);
            })
        })
    });

    describe('Create live stream', function() {
        it(`Check id of token`, function() {
            const facebook = new Facebook("EAAEhscicJa4BAJ5j5a8q1iuvPdV8TYZBGE9qLFnNOFr4bPFgL0UbX6DpKbjksltDIUTNpsox4epDzPCyM3EhZA4JBg2fU6enpuYZBkeAAfRN9NmaQAkWLitJ8ZCOTDNHtu3D84JvpzJSRX2Su0MwBS7bm7qv3U2V8V3706vdgfRWplCL4QxWaZC8Nc0YherNNyV1AmbTVI1WRSAZAA3lf5LyrwULyb1FCry1PLUWM76wZDZD");
            facebook.createLiveStream("Demo Live Stream").then(stream => {
                stream.should.have.property("id");
                stream.should.have.property("stream_url");
                stream.should.have.property("secure_stream_url");
            })
        })
    });

});