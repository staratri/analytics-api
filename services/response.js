let logger = require("../core/logger");


var response = {
	success: (res, data, message = "success") => {
		if (data == undefined && data.length) {
			data = [];
		}
		let result = {
			status: "success",
			count: data.length,
			message,
			data
		};
		logger.log(result);
		return res.json(result);
	},
	fail: (res, message = "fail") => {
		let result = {
			status: "fail",
			message
		}
		logger.log(result);
		return res.json( );
	}
};

module.exports = response;