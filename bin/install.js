const request = require("request-promise");
const fs = require("fs");
const decompress = require("decompress");
const unzip = require('decompress-unzip');
const binPath = __dirname;
const path = require("path");
const ffmpegPath = path.resolve(binPath, `./ffmpeg${isWin() ? ".exe" : ""}`);
const youtubedlPath = path.resolve(binPath, `./youtube-dl${isWin() ? ".exe" : ""}`);
const { exec } = require('child_process');
function Download(url) {
    return request.get({ url, encoding: null });
}
function getBuildFFMPEG() {
    const urlBuild = {
        darwin: {
            x64: 'https://github.com/vot/ffbinaries-prebuilt/releases/download/v4.2/ffmpeg-4.2-osx-64.zip',
        },
        linux: {
            x64: 'https://github.com/vot/ffbinaries-prebuilt/releases/download/v4.2/ffmpeg-4.2-linux-64.zip',
            ia32: 'https://github.com/vot/ffbinaries-prebuilt/releases/download/v4.2/ffmpeg-4.2-linux-32.zip',
            arm: 'https://github.com/vot/ffbinaries-prebuilt/releases/download/v4.2/ffmpeg-4.2-linux-armhf-32.zip',
            arm64: 'https://github.com/vot/ffbinaries-prebuilt/releases/download/v4.2/ffmpeg-4.2-linux-arm-64.zip'
        },
        win32: {
            x64: 'https://github.com/vot/ffbinaries-prebuilt/releases/download/v4.2/ffmpeg-4.2-win-64.zip',
            ia32: 'https://github.com/vot/ffbinaries-prebuilt/releases/download/v4.2/ffmpeg-4.2-win-32.zip'
        },
    }
    const { platform, arch } = process;
    if (!urlBuild[platform]) return;
    return urlBuild[platform][arch];
}
function getBuildYoutubeDL() {
    const urlBuild = `https://yt-dl.org/downloads/latest/youtube-dl${isWin() ? ".exe" : ""}`;
    return urlBuild;
}
function isWin() {
    return process.platform == "win32";
}


(async function() {

    const urlFFMPEG = getBuildFFMPEG();
    const urlYOUTUBEDL = getBuildYoutubeDL();
    if (!urlFFMPEG || !urlYOUTUBEDL) console.log("Platform is not supported!.")
    try {
        console.log(`Download youtube-dl from ${urlYOUTUBEDL}.`);
        const bufYOUTUBEDL = await Download(urlYOUTUBEDL);
        console.log("Download youtube-dl success!.");
        fs.writeFileSync(youtubedlPath, bufYOUTUBEDL, { mode: "0777" });
        console.log(`Download ffmpeg from ${urlFFMPEG}.`);
        const bufFFMPEG = await Download(urlFFMPEG);
        console.log("Decompress ffmpeg.");
        await decompress(bufFFMPEG, binPath, {
            plugins: [unzip()],
            strip: process.platform === 'linux' ? 1 : 2,
            filter: x => x.path === (isWin() ? 'ffmpeg.exe' : 'ffmpeg'),
        });
        console.log("Decompress ffmpeg success!.");
        console.log("Alias command youtube-dl, ffmpeg. Try this:");
        console.log(`alias youtube-dl=${youtubedlPath} ffmpeg=${ffmpegPath}`)
        exec(`alias youtube-dl=${youtubedlPath} ffmpeg=${ffmpegPath}`, (err, stdout, stderr) => {
            if (err) {
                console.error(err.stack);
                return;
            }
            console.log("Alias command success.");
        });
        fs.writeFileSync(binPath + "/runner.json", JSON.stringify({
            "youtubedl": youtubedlPath,
            "ffmpeg": ffmpegPath,
        }, null, "\t"));

    } catch (error) {
        console.log(error.stack);
    }
})();