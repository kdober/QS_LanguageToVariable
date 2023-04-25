define( [ "qlik", 'jquery',"./properties","./initial-properties"], function (qlik, $, props, initProps ) {
	'use strict';	
	return {
		initialProperties: initProps,
		definition: props,
		support : {
			snapshot: false,
			export: false,
			exportData : false
		},
		paint: function ($element, layout) {
			//Get current app where extension lies
			var app = qlik.currApp()
			
			//Get current language contained in the variable and update it necessary
			app.variable.getContent(layout.langVariable).then(function ( currLang ){

				//Only execute this once!
				if(this.painted) return;
    			this.painted = true;

				//Get users browser language & localization
				var userLang = navigator.language || navigator.userLanguage;

				//Get language only
				userLang = userLang.substring(0, 2).toUpperCase();

				//Get URL to the app
				var url = window.location.href;

				//Check if language is set on the app URL
				if( url.lastIndexOf("language/") > 0 ) {
					//If so, use that as language
					userLang = url.substring( url.lastIndexOf("language/") + 9).substring(0, 2).toUpperCase();
				}

				//Compare user language with the list of valid languages -> if doesn't match, set default
				if( layout.langList.toUpperCase().indexOf(userLang.toUpperCase()) < 0 ) {
					userLang = layout.defaultLang
				}
				
				//Set language variable
				if( currLang.qContent.qString != userLang ) {
					app.variable.setStringValue(layout.langVariable, userLang );
				}
				
				//return qlik.Promise.resolve();
			},function(errorObject){
				//Variable doesn't exist
				$element.html( "Variable doesn't exist");
				//return qlik.Promise.resolve();
			});
			
			return qlik.Promise.resolve();
			
		}
	};

} );

