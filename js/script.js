// Div where profile info will go
const overview = document.querySelector(".overview");

const username = "crystal-dv";

//Function to fetch profile info from GitHub and call the displayProfile function
const profileData = async function () {
    const res = await fetch (`https://api.github.com/users/${username}`);

    const data = await res.json();
    displayProfile(data);

};

profileData();


//Function to display profile info in a new div
const displayProfile = function(data) {
    let profile = document.createElement("div");
    profile.className = "user-info";
    profile.innerHTML = `
    <figure> 
        <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div
        `;

    overview.append(profile);
};
