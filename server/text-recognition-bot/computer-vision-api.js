const axios = require("axios")
const { COGNITIVE_SERVICES_API_KEY1, COGNITIVE_SERVICES_API_URL } = process.env

class ComputerVisionApi {

	constructor() {
		this.axios = axios.create()
		this.axios.defaults.headers.post['Content-Type'] = 'application/octet-stream'
		this.axios.defaults.headers.common["Ocp-Apim-Subscription-Key"] = COGNITIVE_SERVICES_API_KEY1
	}

	getApiUrl() {
		return `${ COGNITIVE_SERVICES_API_URL }recognizeText?handwriting=true`
	}

	async analyzeWrittenText(img) {
		try {
			return await this.axios.post(this.getApiUrl(), img)
		}
		catch(e) {
			console.error(e)
		}
	}
}

module.exports = new ComputerVisionApi()