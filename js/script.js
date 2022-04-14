// Div where profile info will go
const overview = document.querySelector(".overview");

const username = "crystal-dv";

const repoList = document.querySelector(".repo-list");

//Function to fetch profile info from GitHub and call the displayProfile function
const getProfile = async function () {
    const profileRes = await fetch (`https://api.github.com/users/${username}`);

    const profileData = await profileRes.json();
    displayProfile(profileData);
};

getProfile();


//Function to display profile info in a new div and call getRepos function
const displayProfile = function(profileData) {
    let profile = document.createElement("div");
    profile.className = "user-info";
    profile.innerHTML = `
    <figure> 
        <img alt="user avatar" src=${profileData.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${profileData.name}</p>
        <p><strong>Bio:</strong> ${profileData.bio}</p>
        <p><strong>Location:</strong> ${profileData.location}</p>
        <p><strong>Number of public repos:</strong> ${profileData.public_repos}</p>
    </div
        `;

    overview.append(profile);
    
    getRepos();
};


//Function to fetch repo data from GitHub and call to display repo info
const getRepos = async function () {
    const repoRes = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);

    const repoData = await repoRes.json();

    displayRepos(repoData);
};

//Function to display repos
const displayRepos = function (repoData) {
    //Looping through repoData to create a list of repos by name and adding a class name for repos
    for(let repo of repoData) {
        repo.className = "repo";
        let listItem = document.createElement("li");
        listItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(listItem);
    };
 };