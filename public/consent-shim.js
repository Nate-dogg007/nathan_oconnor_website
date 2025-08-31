(function(){
function setCookie(name, value, days) {
var d = new Date();
d.setTime(d.getTime() + (days*24*60*60*1000));
var expires = days ? "; expires=" + d.toUTCString() : '';
document.cookie = name + "=" + encodeURIComponent(JSON.stringify(value)) + expires + "; path=/; samesite=lax; secure";
}


function toState(input){
// Accept either boolean flags or Consent Mode strings
const v = (x)=> x===true || x==='granted' ? 'granted' : 'denied';
return {
analytics_storage: v(input.analytics_storage),
ad_storage: v(input.ad_storage),
ad_user_data: v(input.ad_user_data),
ad_personalization: v(input.ad_personalization)
};
}


window.dfyConsent = {
update(state){
setCookie('consent_state', toState(state), 365);
document.dispatchEvent(new CustomEvent('dfy:consentUpdated', { detail: toState(state) }));
}
};
})();
