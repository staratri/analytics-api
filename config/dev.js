let path = require("path");
let pkg = require("../package.json");

let app_conf = {
	port: 3000,
	db: {
		uri: process.env.MONGO_URI || "mongodb://localhost:27017/analytiks",
		options: {
			// useMongoClient: true,
			user: "",
			pass: "",
			server: {
				socketOptions: {
					keepAlive: 1
				}
			}
		}
	},
	mailer: {
		host: 'smtp.sparkpostmail.com',
		port: 587,
		username: 'SMTP_Injection',
		password: '9e8b95f48571bb5133282222c41d949b00763780'
	},
	logging: {
		console: {
			level: "debug"
		},

		file: {
			enabled: false,
			path: path.join(global.rootPath, "logs"),
			level: "info",
			json: false,
			exceptionFile: true
		},

		graylog: {
			enabled: false
			// servers: [ { host: "192.168.0.174", port: 12201 } ]
		},

		papertrail: {
			enabled: false,
			host: null,
			port: null,
			level: "debug",
			program: "vem"
		},

		logentries: {
			enabled: false,
			token: null
		},

		loggly: {
			enabled: false,
			token: null,
			subdomain: null
		},

		logsene: {
			enabled: false,
			token: null
		},

		logzio: {
			enabled: false,
			token: null
		}

	},
	web3Provider: 'http://localhost:8545',
	agendaTimer: "1 second",
};

module.exports = app_conf;