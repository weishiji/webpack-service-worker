const Utils = (function(){
	let ROOT_APP;
	return {
		kindomUrl : function(path){
			return '/api' + path
		}
		,getDefaultLanguage : function(){
			return localStorage.getItem('language') || 'en';
		}
		,setDefaultLanguage : function(_lan){
			localStorage.language = _lan;
		}
		,isOwnEmpty : function(obj){
		    for(var name in obj)
			    {
			        if(obj.hasOwnProperty(name))
			        {
			            return false;
			        }
			    }
		    return true;
		}
		,convertTime : function(time){
			return time * 1000
		}
	}

}())
export default Utils;
