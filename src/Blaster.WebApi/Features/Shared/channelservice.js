import HttpClient from "httpclient";

export default class ChannelService {
    constructor() {
        this.client = new HttpClient();
        this.baseUrl = "api/channel";

        this.getAll = this.getAll.bind(this);
    }

    // Get public channels
    getAll() {
        return this.client.get(this.baseUrl + "s")
            .then(data => data.items || []);
    }

    join(payload) {
        return this.client.post(`${this.baseUrl}/join`, payload);
    }
    leave(payload) {
        return this.client.post(`${this.baseUrl}/leave`, payload);
    }
}