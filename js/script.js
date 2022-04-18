// Div where profile info will go
const overview = document.querySelector(".overview");
const username = "crystal-dv";
//Unordered list where repos will go
const repoArea = document.querySelector(".repo-list");
//Section where list of repos is displayed
const repoGallery = document.querySelector(".repos");
//Section where each individual repo's data will go when selected
const singleRepo = document.querySelector(".repo-data");
//Back to Repo Gallery button
const backButton = document.querySelector(".view-repos");
//Input for search by name feature of repo gallery
const filterInput = document.querySelector(".repos .filter-repos");


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
    //Show the input box for search feature
    filterInput.classList.remove("hide");
    //Looping through repoData to create a list of repos by name and adding a class name for repos
    for(let repo of repoData) {
        let listItem = document.createElement("li");
        listItem.classList.add("repo");
        listItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoArea.append(listItem);
    };
 };

 //Event listener for clicking on a repo title
 const repoList = repoArea.addEventListener( "click", function (e) {
     if (e.target.matches("h3")) {
         const repoName = e.target.innerText;
         getRepoInfo(repoName);
     };
 });

 //Function to fetch info about an individual repo
 const getRepoInfo = async function (repoName) {
     const repoInfoRes = await fetch (`https://api.github.com/repos/${username}/${repoName}`);

     const repoInfo = await repoInfoRes.json();

     const fetchLanguages = await fetch (`${repoInfo.languages_url}`);

     const languageData = await fetchLanguages.json();

     const languages = [];
     for (let lang in languageData) {
         languages.push(lang);
     };

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

        //Show a selected repo's data and the back button and hide the list of repos
        singleRepo.classList.remove("hide");
        repoGallery.classList.add("hide");
        backButton.classList.remove("hide");
    };

    //Event listener for the back to repo gallery button
    const goBack = backButton.addEventListener("click", function(e) {
        //Show repo gallery and hide individual repo info and back button
        repoGallery.classList.remove("hide");
        singleRepo.classList.add("hide");
        backButton.classList.add("hide");
    });
    
    //Event listener for repo search by name input
    const inputSearch = filterInput.addEventListener("input", function(e) {
        //Captures the value of the input box
        const repoSearch = e.target.value;
        //Selects each repo of the list by using the class name "repo"
        const repos =  document.querySelectorAll(".repos .repo-list .repo");
        //Shifts any search input to lowercase to make it more comparable
        const lowercase = repoSearch.toLowerCase();
        
        //Checks if a repo includes letters from the search input and adjusts the list accordingly
        if (repoSearch !== "") {
            for(let item of repos) {
                //Shifts each item of the repos selection to lowercase to make it easily comparable
                const repoByName = item.innerText.toLowerCase();
                if(!repoByName.includes(lowercase)) {
                    item.classList.add("hide");
                } else {
                    item.classList.remove("hide");
                };
            };
        //If the seach box is blank, then show all the repos again
        } else {
            for(let item of repos) {
                item.classList.remove("hide");
            };
        };
    });