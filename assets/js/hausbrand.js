// https://manage.auth0.com/dashboard/eu/hausbraand/applications/aM2OX9ZBJSzRupNYeWWtPXZauw3OdLIG/quickstart

let auth0 = null;
const fetchAuthConfig = () => fetch("/auth_config.json")

const configureClient = async () => {
    const response = await fetchAuthConfig()
    const config = await response.json()

    auth0 = await createAuth0Client ({
        domain: config.domain,
        client_id = config. clientID
    })
}

window.oload = async () => {
    await configureClient()
}


