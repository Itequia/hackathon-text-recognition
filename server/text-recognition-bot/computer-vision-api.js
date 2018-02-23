const axios = require("axios")
const { COGNITIVE_SERVICES_API_KEY1, COGNITIVE_SERVICES_API_URL } = process.env

class ComputerVisionApi {

	constructor() {
		this.axios = axios.create()
		this.axios.defaults.headers.post['Content-Type'] = 'application/octet-stream'
		this.axios.defaults.headers.common["Ocp-Apim-Subscription-Key"] = COGNITIVE_SERVICES_API_KEY1
		this.recognizeTextUrl = `${ COGNITIVE_SERVICES_API_URL }recognizeText?handwriting=true`
	}

	async getOperationResult(url) {
		return new Promise((resolve, reject) => {
			let interval = setInterval(async () => {
				try {
					console.log("Requesting result...");
					let result = await this.axios.get(url)
					if (result.data.status !== "Running") {
						clearInterval(interval)
						if (result.data.status === "Succeeded") resolve(result)
						else reject()
					}
				}
				catch(e) {
					clearInterval(interval)
					reject(e)
				}
			}, 400)
		})
	}

	async analyzeWrittenText(img) {
		try {
			return await this.axios.post(this.recognizeTextUrl, img)
		}
		catch(e) {
			console.error(e)
		}
	}
}

module.exports = new ComputerVisionApi()