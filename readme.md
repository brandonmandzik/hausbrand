# Hausbrand

###### Author: Brandon Mandzik, 2021

![image](https://user-images.githubusercontent.com/35039517/119002497-396e7680-b98d-11eb-85f6-cdc598d1eb69.png)

### Introduction

This repository serves as my workspace for my bachelor thesis. The resulting application is a web blog developed and hosted with the support of the [JAMstack ideaology](https://jamstack.org). The frontend utilises the **Hugo** framework. For the backend the used services are **Hyvor, SendinBlue, Auth0 and Netlify**. 

When you are one of my **professors** - please contact me, so that I can activate all services. Currently some are *deactivated* to save money. I will also even grant you the *credentials* for the backend services, so you can have a look around and test it out.

The **latest production** is viewable under https://hausbrand.netlify.app <br>
For the best experience - I recommend  using Google Chrome.



## Getting Started

In order to start the local development server, you need Hugo installed on your local machine. You can do so with a package manager like brew (Mac OS).

```shell
brew install hugo
```

Having done that, navigate to the project folder containing the _config.toml_ file.
From here you can start a local hugo server via

```shell
hugo server
```

This will launch the project and is viewable in the browser by typing and loading http://localhost:1313/.

The CMS is available under http://localhost:1313/admin.



## Project Structure

| Section   | Function                                                     |
| --------- | ------------------------------------------------------------ |
| assets    | CSS and JS files                                             |
| content   | Holds content for the templating as markdown files.          |
| functions | Compiled Go binaries for AWS servers. Function names result in endpoint names. |
| layouts   | Holds view templates for the application                     |
| public    | Build directory                                              |
| static    | Used for static files like images and .html files. Also contains the /admin (CMS) files |
| themes    | Holds the hugo theme submodul                                |



## Backend Services

![image](https://user-images.githubusercontent.com/35039517/119002391-1f349880-b98d-11eb-893d-68d0c4808b01.png)

The JAMStack blog utilises a few third-party providers to enrich the functionality. Things that were out of scope, have been build locally. The resulting binaries are inside of /functions. This will translate to serverless functions endpoints following this structure: 
```https
<domain>/.netlify/functions/<functionName>[?<queries=values>&]
``` 
The related binary's code can be requested if needed, they're not here in order to save hosting space. 

### Providers
The mail service is covered by [**SendinBlue**](https://www.sendinblue.com).

The commenting service by [__Hyvor__](https://hyvor.com).

The authentication by [__auth0__](https://auth0.com) which replaced Netlify Identity. 

The hosting provider is [**Netlify**](https://www.netlify.com) and allows the owner to be as 'serverless' as possible. 

