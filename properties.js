
define(["text!./LanguageToVariable.qext"], function(qext) {
    about = {
		label: function() {
			return "About " + JSON.parse(qext).name;
		},
		type: "items",
		items: {
			author: {
				label: "This Qlik Sense extension is developed by Cristian Dorbesi, REVEAL AB",
				component: "text"
			},
			version: {
				label: function() {
					return "Version: " + JSON.parse(qext).version;
				},
				component: "text"
			},
			description: {
				label: "Please refer to the accompanying documentation page for a detailed description of this extension and its features.",
				component: "text"
			}
		}
	};
    return {
        // Define what our properties panel look like
        type: "items",
        component: "accordion",
        items: {
            Language: {
                label: "Language",
                //component: "accordion",
                items: {
                    Default: {
                        type: "string",
                        label: "Default",
                        ref: "defaultLang",
                        defaultValue: "EN",
                        expression: "optional"
                    },
                    Variable: {
                        type: "string",
                        label: "Variable name",
                        ref: "langVariable",
                        expression: "optional"
                    },
                    Languages: {
                        type: "string",
                        label: "List of languages",
                        ref: "langList",
                        expression: "optional"
                    }
                }
            },
			appearance: {
				uses: "settings",
			},
            about: about
        }
    }
});