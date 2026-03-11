const projectsDiv = document.getElementById("projects");

const projectItems = [
    { 
        title: "Arena Fighting Game", 
        url: "#", 
        description: "I have been working on a console game in order to practice C#. It is simple right now, just naming a fighter, entering the arena, and fighting 3 monsters to win, but I plan to expand it as I learn more about C#."
    },
    { 
        title: "Travel Agency Website", 
        url: "#", 
        description: "I will be making a website for a travel agency once I have the prerequisite understanding and skill."},
    { 
        title: "Portfolio", 
        url: "#", 
        description: "This portfolio"},
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

    const desc = document.createElement("p");
    desc.textContent = projects.description;
    li.appendChild(desc);

    li.appendChild(a);
    ul.appendChild(li);
});

projectsDiv.appendChild(ul);