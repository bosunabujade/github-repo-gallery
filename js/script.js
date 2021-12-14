// This is targeting the div with the class overview
const profileOverview = document.querySelector(".overview");
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
}