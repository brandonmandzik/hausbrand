# Hausbrand

###### Author: Brandon Mandzik, 2021

![image-20210520152006349](/Users/brandonmandzik/Library/Application Support/typora-user-images/image-20210520152006349.png)



### Introduction

This repository serves as my workspace for my bachelor thesis. The resulting application is a web blog developed and hosted with the support of the [JAMstack ideaology](https://jamstack.org). The frontend utilises the **Hugo** framework. For the backend the used services are **Hyvor, SendinBlue, Auth0 and Netlify**. 

When you are one of my **professors** - please contact me, so that I can activate all services. Currently some are *deactivated* to save money. I will also even grant you the *credentials* for the backend services, so you can have a look around and test it out.

The **latest production** is viewable under https://hausbrand.netlify.app
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
| functions | Compiled Go binaries for AWS servers. Function name results in endpoint name |
| layouts   | Holds view templates for the application                     |
| public    | Build directory                                              |
| static    | Used for static files like images and .html files. Also contains the /admin (CMS) files |
| themes    | Holds the hugo theme submodul                                |



## Backend Services

![Tech Stack](/Users/brandonmandzik/Documents/Study/Bachelor Thesis/Workspace/Pictures/Tech Stack.png)



The JAMStack blog utilises a few third-party providers to enrich the functionality. Things that have been out of scope, have been build locally. The resulting binaries are inside of /functions. The related code can be requested if needed, they're not here in order to save hosting space. 

The mail service is covered by **SendinBlue**.

The commenting service by __Hyvor__.

The authentication by __auth0__ which replaced Netlify Identity. 

The hosting provider is **netlify** and allows the owner to be as 'serverless' as possible. 

