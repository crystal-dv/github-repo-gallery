// Div where profile info will go
const overview = document.querySelector(".overview");
const username = "crystal-dv";
//Unordered list where repos will go
const repoArea = document.querySelector(".repo-list");
//Selects section where list of repos is displayed
const repos = document.querySelector(".repos");
//Section where each individual repo's data will go when selected
const singleRepo = document.querySelector(".repo-data");


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
        repoArea.append(listItem);
    };
 };

 //Event listener for clicking on a repo title
 const repoList = repoArea.addEventListener( "click", function (e) {
     if (e.target.matches("h3")) {
         const repoName = e.target.innerText;
         getRepoInfo(repoName);
     }
 });

 //Function to get info about an individual repo
 const getRepoInfo = async function (repoName) {
     const repoInfoRes = await fetch (`https://api.github.com/repos/${username}/${repoName}`);

     const repoInfo = await repoInfoRes.json();

     const fetchLanguages = await fetch (`${repoInfo.languages_url}`);

     const languageData = await fetchLanguages.json();

     const languages = [];
     for (let lang in languageData) {
         languages.push(lang);
     }

     displayRepoInfo(repoInfo, languages);
    };
    
    //Function to display specific info about a selected repo
    const displayRepoInfo = function(repoInfo, languages) {
        singleRepo.innerHTML = "";
        const displayDiv = document.createElement("div");
        displayDiv.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
        `;
        
        singleRepo.append(displayDiv);

        //Show a selected repo's data and hide the list of repo
        singleRepo.classList.remove("hide");
        repos.classList.add("hide");
    };