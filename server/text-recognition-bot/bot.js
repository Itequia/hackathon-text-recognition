const fs = require("fs")
const axios = require("axios")
const SlackBot = require("../utils/slack-bot")
const computerVision = require("./computer-vision-api")
const dialog = require("./dialog")
const {promisify} = require('util');
const path = require('path');

const { SLACK_API_TOKEN, APP_URL } = process.env

class ItequiaBot extends SlackBot {

    constructor() {
        super()
		this.init()
		this.axios = axios.create()
		this.axios.defaults.headers.common["Authorization"] = "Bearer " + SLACK_API_TOKEN
    }

    async init() {
        this.startBot (SLACK_API_TOKEN)
    }

    onDirectMention (bot, message) {
		return bot.reply(message, dialog.usage)
    }

    onDirectMessage (bot, message) {
		return bot.reply(message, dialog.usage)
	}
	
	async onFileShared(bot, message) {
		const resp = await this.api("files.info", { 
			file: message.file_id
		})
		try {
			let img = await axios.request({
				responseType: 'arraybuffer',
				url: resp.file.url_private,
				method: "get"
			})
			const response = await computerVision.analyzeWrittenText(img.data)
			let operationLocation = response.headers["operation-location"]
			let imageAnalysis = await computerVision.getOperationResult(operationLocation)
			imageAnalysis = imageAnalysis.data.recognitionResult
	

			let file = await promisify(fs.readFile)(path.resolve(__dirname, "../public/index.html"), "utf8")
			file +=`<script>window.imageAnalysis = ${ JSON.stringify( imageAnalysis ) }</script></body></html>`
			let filename = "index." + Date.now() + ".html"
			await promisify(fs.writeFile)(path.resolve(__dirname, "../public") + "/" + filename, file)

			await this.api("chat.postMessage", { 
				channel: message.user_id,
				text: "Imagen analizada! La puedes encontrar en: " + APP_URL + filename,
				as_user: true,
			})
		}
		catch(e) {
			console.error(e);
			return bot.reply(message, dialog.error)
		}
	}
}

module.exports = ItequiaBot