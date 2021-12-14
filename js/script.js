// This is targeting the div with the class overview
const profileOverview = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list")
const repoSection = document.querySelector(".repos")
const repoDataSection = document.querySelector(".repo-data")
const username = "bosunabujade";

const getProfile = async function() {
    const profile = await fetch(`https://api.github.com/users/${username}`)
    const profileData = await profile.json()
    console.log(profileData)
    userInformation(profileData)
}
getProfile()

const userInformation= function (profileData) {
    const userInfoBlock = document.createElement("div");
    userInfoBlock.classList.add("user-info");
    userInfoBlock.innerHTML =  
    `<figure>
    <img alt="user avatar" src=${profileData.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${profileData.name}</p>
        <p><strong>Bio:</strong> ${profileData.bio}</p>   
        <p><strong>Location:</strong> ${profileData.location}</p>   
        <p><strong>Number of public repos:</strong> ${profileData.public_repos}</p>
    </div>`
    profileOverview.append(userInfoBlock)
    getRepoList()
}
const getRepoList = async function() {
    const list = await fetch(`https://api.github.com/users/${username}/repos`)
    const listData = await list.json()
    displayRepoInfo(listData)
}

const displayRepoInfo = function(repos) {
    for (const repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3> ${repo.name} </h3>`
        repoList.append(li)
    }
}
repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        specificRepoData(repoName)
    }
})

const specificRepoData = async function(repoName) {
    const fetchRepoInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`)
    const repoInfo = await fetchRepoInfo.json()
    console.log(repoInfo)

    const fetchLanguages = await fetch(repoInfo.languages_url)
    const languagesData = await fetchLanguages.json()

    const languages = []
    for (const language in languagesData) {
        languages.push(language)
    }

    displaySpecificRepoData(repoInfo, languages)
}

const displaySpecificRepoData = function(repoInfo, languages) {
    repoDataSection.innerHTML = "";
    repoDataSection.classList.remove("hide")
    repoSection.classList.add("hide")
    let div = document.createElement("div"); 
    div.innerHTML = 
    `<h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
    repoDataSection.append(div);    
}