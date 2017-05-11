module.exports = {
	
	'ws' : {
		'port' : 8003
	},
	'redis' : {
		'port' : 6379
	},
	"logger": {
        "api": "logs/api.log",
        "exception": "logs/exceptions.log"
    },
	"apis" : {
		"mp_playout_api" : "http://localhost:8001/api/"
	}
};