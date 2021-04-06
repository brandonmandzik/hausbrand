// https://manage.auth0.com/dashboard/eu/hausbraand/applications/aM2OX9ZBJSzRupNYeWWtPXZauw3OdLIG/quickstart

let auth0 = null;
const fetchAuthConfig = () => fetch("/auth_config.json")

const configureClient = async () => {
    const response = await fetchAuthConfig()
    const config = await response.json()

    auth0 = await createAuth0Client({
        domain: config.domain,
        client_id: config.clientId
    })
}

window.onload = async () => {
    await configureClient()

    updateUI()

    const isAuthenticated = await auth0.isAuthenticated()

    if (isAuthenticated) {
        // show the gated content
        return
    }

    const query = window.location.search
    if (query.includes("code=") && query.includes("state=")) {

        await auth0.handleRedirectCallback()

        updateUI()

        window.history.replaceState({}, document.title, "/")
    }
}

const updateUI = async () => {
    const isAuthenticated = await auth0.isAuthenticated();

    document.getElementById("btn-logout").disabled = !isAuthenticated
    document.getElementById("btn-login").disabled = isAuthenticated

    if (isAuthenticated) {
        let gatedElements = document.getElementsByClass("gated-content")
        for (e in gatedElements){
            e.classList.remove("gated-content")
        }
    } else {
        document.getElementById("gated-content").remove();
        let gatedElements = document.getElementsByClass("gated-content")
        for (e in gatedElements){
            e.remove("")
        }
    }
}

const login = async () => {
    await auth0.loginWithRedirect({
        redirect_uri: window.location.origin
    })
}

const logout = () => {
    auth0.logout({
        returnTo: window.location.origin
    });
};


