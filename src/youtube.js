const { youtubedl } = require("../bin/runner.json");
const { exec } = require("child_process");
const regexYtb = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
const regexURL = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
const execPromise = function(command) {
    return new Promise(function(resolve, reject) {
        exec(command, function(error, stdout, stderr) {
            if (error || stderr) return reject(error || stderr);
            return resolve(stdout.trim());
        })
    });
}

class Youtube {
    constructor(url) {
        this.url = url.replace(" ", "");
    }

    static async validate(url) {
        try {
            // if (!regexYtb.test(this.url)) return false;
            if (!regexURL.test(url || this.url)) return false;
            const data = await execPromise(`${youtubedl} -j ${url || this.url} --skip-download`);
            return !!data;
        } catch (error) {
            return false;
        }
    }

    getAudio() {
        return execPromise(`${youtubedl} -g -f bestaudio[ext=m4a] ${this.url} --restrict-filenames --skip-download`);
    }

    getVideo() {
        return execPromise(`${youtubedl} -g -f "best[height<720]" ${this.url} --restrict-filenames --skip-download`)
    }
}

module.exports = Youtube;