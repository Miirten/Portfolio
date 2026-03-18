const projectsDiv = document.getElementById("projects");

const projectItems = [
    { 
        title: "Arena Fighting Game", 
        url: "https://github.com/Miirten/Portfolio.git", 
        description: "I have been working on a console game in order to practice C#. It is simple right now, just naming a fighter, entering the arena, and fighting 3 monsters to win, but I plan to expand it as I learn more about C#."
    // generic arena picture
    },
    { 
        title: "Travel Agency Website", 
        url: "https://github.com/Miirten/Portfolio.git", 
        description: "I will be making a website for a travel agency once I have the prerequisite understanding and skill.",
        image: "images/alfamar.jpg"
    },
    { 
        title: "Portfolio", 
        url: "https://github.com/Miirten/Portfolio.git",
        description: "This portfolio"}
    ];

const ul = document.createElement("ul");

projectItems.forEach(projects => {

    const urlText = projects.url;

    const li = document.createElement("li");
    li.className = "projectList";

    const title = document.createElement("a");
    title.textContent = projects.title;
    title.setAttribute("href", urlText);
    const a = document.createElement("a");
    li.appendChild(title);

    if (projects.image) {
        const img = document.createElement("img");
        img.src = projects.image;
        img.alt = projects.title + "screenshot";
        img.width = 100;
        li.appendChild(img);
    }

    const desc = document.createElement("p");
    desc.textContent = projects.description;
    li.appendChild(desc);

    li.appendChild(a);
    ul.appendChild(li);
});

projectsDiv.appendChild(ul);