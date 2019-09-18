const request = require("request-promise").defaults({
    json: true,
});
class Facebook {
    constructor(token) {
        this.token = token;
        this.request = request.defaults({
            qs: {
                access_token: token
            }
        })
    }
    async validate() {
        try {
            const data = await this.request("https://graph.facebook.com/me");
            if (data && !data.error) return true;
            return false;
        } catch (error) {
            return false;
        }
    }
    async getID() {
        const { id } = await this.request({
            url: "https://graph.facebook.com/me",
            qs: {
                fields: "id, name"
            }
        })
        return parseInt(id, 10) || 0;
    }

    createLiveStream(description) {
        return this.request({
            url: "https://graph.facebook.com/me/live_videos",
            qs: {
                method: "POST",
                save_vod: true,
                status: "LIVE_NOW",
                stop_on_delete_stream: true,
                privacy: JSON.stringify({ value: 'EVERYONE' }),
                description,
            }
        })
    }
}

module.exports = Facebook;