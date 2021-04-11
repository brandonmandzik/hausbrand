// https://manage.auth0.com/dashboard/eu/hausbraand/applications/aM2OX9ZBJSzRupNYeWWtPXZauw3OdLIG/quickstart
// https://github.com/auth0-samples/auth0-javascript-samples/blob/7bb912c0aa5db7735f3daf5ffcadbfc4a6e02d4b/01-Login/public/js/app.js

/**
 * CONFIGURATION
*/

// init auth0
let auth0 = null;

// fetch configs
const fetchAuthConfig = () => fetch("/auth_config.json")

// configure auth0 client for furhter usage
const configureClient = async () => {
    try {
        const response = await fetchAuthConfig()
        const config = await response.json()
        auth0 = await createAuth0Client({
            domain: config.domain,
            client_id: config.clientId,
            useRefreshTokens: true,
            cacheLocation: 'localstorage'
        })
    } catch (err) {
        console.log("Failed loading configs ...", err)
    }

}

// When accessing resitricted content, this method will redirect to the login page
const requireAuth = async (targetUrl) => {
    const isAuthenticated = await auth0.isAuthenticated();

    if (isAuthenticated) {
        return;
    }

    return login(targetUrl);
};

// updateUI will handle the visibiliy based on user
const updateUI = async () => {
    try {
        const isAuthenticated = await auth0.isAuthenticated();

        // Check for null -> avoid error
        if (document.getElementById("btn-logout")) {
            document.getElementById("btn-logout").disabled = !isAuthenticated
            document.getElementById("btn-login").disabled = isAuthenticated
        }

        // Gate content based on user role

        // UI for YES
        if (isAuthenticated) {
            var gatedElements = document.getElementsByClassName("gated-content")
            for (var i = gatedElements.length - 1; i >= 0; i--) {
                gatedElements[i].classList.remove("gated-content");
            }
            document.getElementById("gated-content-rev").classList.add("gated-content")
        }
        // UI for NO
        else {
            var gatedElements = document.getElementsByClassName("gated-content")
            for (var i = gatedElements.length - 1; i >= 0; i--) {
                gatedElements[i].parentNode.removeChild(gatedElements[i]);
            }

        }
    } catch (err) {
        console.log("UI update Error!", err)
    }
}

const decryptLinks = async () => {
    var encryptedLinks = document.getElementsByClassName("privateLink")
    for (var i = encryptedLinks.length - 1; i >= 0; i--) {
        // get link
        var cipher = encryptedLinks[i].getAttribute("href")
        console.log(cipher)
        // make request
        const baseURL = "https://hausbrand.netlify.app/.netlify/functions/linkDecrypt"
        const params = "?ct=" + cipher
        var url = baseURL + params
        const data = await fetch(url, {
            method: "GET",
            mode: "cors"
        })
        var plain = await data.text()
            .catch(err => console.error("err", error))
        encryptedLinks[i].setAttribute("href", plain)
        console.log(plain)
    }
}

/**
 * ---MAIN---
 * @returns 
 */

// Checks User state on window.Onload
window.onload = async () => {
    await configureClient()
    // Regex check to redirect to login
    // https://www.regextester.com
    if (/\/work\/.+/.test(window.location.pathname)) {
        requireAuth(window.location.pathname)
    }

    const isAuthenticated = await auth0.isAuthenticated()

    if (isAuthenticated) {
        console.log("> User is authenticated");
        decryptLinks();
        updateUI();
        return;
    }

    console.log("> User not authenticated");
    // parsing redirect
    const query = window.location.search
    if (query.includes("code=") && query.includes("state=")) {
        try {
            await auth0.handleRedirectCallback()
        } catch (err) {
            console.log("error parsing redirect:", err)
        }
        window.history.replaceState({}, document.title, "/")
    }
    updateUI()
}


/**
 * LOGIN & SIGN-UP METHODS  
 */

// a successful login redirects the user to the origin/work page
const login = async (targetUrl) => {
    try {
        console.log("Logging in")
        const options = {
            redirect_uri: window.location.origin + "/work"
        };

        await auth0.loginWithRedirect(options);
    } catch (err) {
        console.log("Login failed", err)
    }
}

// log the user out and direct to the index page
const logout = () => {
    try {
        console.log("Logging out");
        auth0.logout({
            returnTo: window.location.origin
        })
    } catch (err) {
        console.log("Log out failed", err);
    }
};


