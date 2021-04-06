// https://manage.auth0.com/dashboard/eu/hausbraand/applications/aM2OX9ZBJSzRupNYeWWtPXZauw3OdLIG/quickstart

/**
 * CONFIGURATION
*/

// init auth0
let auth0 = null;

// fetch configs
const fetchAuthConfig = () => fetch("/auth_config.json")

// configure auth0 client for furhter usage
const configureClient = async () => {
    const response = await fetchAuthConfig()
    const config = await response.json()

    auth0 = await createAuth0Client({
        domain: config.domain,
        client_id: config.clientId
    })
}

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
        
        document.getElementById("btn-logout").disabled = !isAuthenticated
        document.getElementById("btn-login").disabled = isAuthenticated

        if (isAuthenticated) {
            var gatedElements = document.getElementsByClassName("gated-content")
            for (var i = gatedElements.length - 1; i >= 0; i--) {
                gatedElements[i].classList.remove("gated-content");
            }
        } else {
            var gatedElements = document.getElementsByClassName("gated-content")
            for (var i = gatedElements.length - 1; i >= 0; i--) {
                gatedElements[i].parentNode.removeChild(gatedElements[i]);
                // gatedElements[i].classList.add("gated-content");
            }
        }
    } catch (err) {
        console.log("UI update Error!", err)
    }
}

/**
 * ---MAIN---
 * @returns 
 */

// Checks User state .Onload
window.onload = async () => {
    await configureClient()

    if (/\/work\/.+/.test(window.location.pathname)){
        requireAuth("/work")
    }

    const isAuthenticated = await auth0.isAuthenticated()

    if (isAuthenticated) {
        console.log("> User is authenticated");
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

const login = async (targetUrl) => {
    try {
        console.log("Logging in")
        const options = {
            redirect_uri: window.location.origin + "/work"
        };

        if (targetUrl) {
            options.appState = { targetUrl };
        }

        await auth0.loginWithRedirect(options);
    } catch (err) {
        console.log("Login failed", err)
    }
}

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


