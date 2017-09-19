require.config({
	baseUrl:"/",
	paths:{
		"jquery":"lib/jquery/jquery-1.12.4.min",
		"template":"lib/arttemplate/template-native",
		"header":"js/header",
		"cookie":"lib/jquery_plugins/jquery.cookie",
	},
	shim : {
		"header" : {
			deps : ["jquery"]
		},
		"cookie" : {
			deps : ["jquery"]
		},
	}
})