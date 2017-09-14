require.config({
	baseUrl:"/",
	paths:{
		"jquery":"lib/jquery/jquery-1.12.4.min",
		"template":"lib/arttemplate/template-native",
		"cookie":"lib/jquery_plugins/jquery.cookie",
		"header":"js/header",
	},
	shim : {
		"header" : {
			deps : ["jquery"]
		}
	}
})