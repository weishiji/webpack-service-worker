/**
 * Created by lxg on 23/05/2017.
 */
var registerServiceWorker = function(){
	if('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/my-service-worker.js');
	}
	
}




export default registerServiceWorker;
