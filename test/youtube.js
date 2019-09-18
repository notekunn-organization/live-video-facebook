const Youtube = require("../src/youtube")
describe('Youtube', function() {
    this.timeout(5000);
    describe('Validate url', function() {
        it('Not Valid URL', function(done) {
            Youtube.validate("12432222/l3e34")
                .then(validate => {
                    !validate && done();
                })
        });
        it('Valid URL', function(done) {
            Youtube.validate("https://www.youtube.com/watch?v=UbQgXeY_zi4")
                .then(validate => {
                    validate && done();
                })
        });
    });
    describe('Get video, audio', function() {
        const url = "https://www.youtube.com/watch?v=UbQgXeY_zi4";
        const youtube = new Youtube(url)
        it('Get Audio', function(done) {
            youtube.getAudio()
                .then(source => {
                    if (typeof source === "string") done();
                })
        });
        it('Get Video', function(done) {
            youtube.getVideo()
                .then(source => {
                    if (typeof source === "string") done();
                })
        });
    });
});