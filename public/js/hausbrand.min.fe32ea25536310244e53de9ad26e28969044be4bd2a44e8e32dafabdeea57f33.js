let auth0=null;const fetchAuthConfig=()=>fetch("/auth_config.json")
const configureClient=async()=>{try{const response=await fetchAuthConfig()
const config=await response.json()
auth0=await createAuth0Client({domain:config.domain,client_id:config.clientId,useRefreshTokens:true,cacheLocation:'localstorage'})}catch(err){console.log("Failed loading configs ...",err)}}
const requireAuth=async(targetUrl)=>{const isAuthenticated=await auth0.isAuthenticated();if(isAuthenticated){return;}
return login(targetUrl);};const updateUI=async()=>{try{const isAuthenticated=await auth0.isAuthenticated();if(document.getElementById("btn-logout")){document.getElementById("btn-logout").disabled=!isAuthenticated
document.getElementById("btn-login").disabled=isAuthenticated}
if(isAuthenticated){var gatedElements=document.getElementsByClassName("gated-content")
for(var i=gatedElements.length-1;i>=0;i--){gatedElements[i].classList.remove("gated-content");}
document.getElementById("gated-content-rev").classList.add("gated-content")}
else{var gatedElements=document.getElementsByClassName("gated-content")
for(var i=gatedElements.length-1;i>=0;i--){gatedElements[i].parentNode.removeChild(gatedElements[i]);}}}catch(err){console.log("UI update Error!",err)}}
const decryptLinks=async()=>{var encryptedLinks=document.getElementsByClassName("privateLink")
for(var i=encryptedLinks.length-1;i>=0;i--){var cipher=encryptedLinks[i].getAttribute("href")
console.log(cipher)
const baseURL="https://hausbrand.netlify.app/.netlify/functions/linkDecrypt"
const params="?ct="+cipher
var url=baseURL+params
const data=await fetch(url,{method:"GET",mode:"cors"})
var plain=await data.text().catch(err=>console.error("err",error))
encryptedLinks[i].setAttribute("href",plain)
console.log(plain)}}
window.onload=async()=>{await configureClient()
if(/\/work\/.+/.test(window.location.pathname)){requireAuth(window.location.pathname)}
const isAuthenticated=await auth0.isAuthenticated()
if(isAuthenticated){console.log("> User is authenticated");decryptLinks();updateUI();return;}
console.log("> User not authenticated");const query=window.location.search
if(query.includes("code=")&&query.includes("state=")){try{await auth0.handleRedirectCallback()}catch(err){console.log("error parsing redirect:",err)}
window.history.replaceState({},document.title,"/")}
updateUI()}
const login=async(targetUrl)=>{try{console.log("Logging in")
const options={redirect_uri:window.location.origin+"/work"};await auth0.loginWithRedirect(options);}catch(err){console.log("Login failed",err)}}
const logout=()=>{try{console.log("Logging out");auth0.logout({returnTo:window.location.origin})}catch(err){console.log("Log out failed",err);}};