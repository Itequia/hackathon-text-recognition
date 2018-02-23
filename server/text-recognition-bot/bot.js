const fs = require("fs")
const axios = require("axios")
const SlackBot = require("../utils/slack-bot")
const computerVision = require("./computer-vision-api")
const dialog = require("./dialog")
const {promisify} = require('util');
const path = require('path');

const { SLACK_API_TOKEN } = process.env

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
			let img = await axios.get(resp.file.url_private)
			await promisify(fs.writeFile)(path.resolve(__dirname, "../public/temp.jpg"), new Buffer(img.data, 'binary').toString('base64'))
			let file = await promisify(fs.readFile)(path.resolve(__dirname, "../public/temp.jpg"))

			const imageAnalysis = await computerVision.analyzeWrittenText(file)
			return bot.reply(message, dialog.usage)
		}
		catch(e) {
			console.error(e);
		}
		return bot.reply(message, dialog.usage)
	}
}

module.exports = ItequiaBot