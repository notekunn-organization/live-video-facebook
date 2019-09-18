const Youtube = require("./src/youtube");
const url = "https://www.youtube.com/watch?v=zoFj8EdAHGg";

const youtube = new Youtube(url);

(async function(){
    const validate = await Youtube.validate(url);
    if(!validate) return console.log("Video khong hop le");
    console.log(`VIDEO: ${await youtube.getVideo()}`)
    console.log(`AUDIO: ${await youtube.getAudio()}`)

})();