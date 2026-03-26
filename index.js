const projectItems = [
    {
        title: "Arena Fighting Game",
        url: "https://github.com/Miirten/Portfolio.git",
        description: "I have been working on a console game in order to practice C#. It is simple right now, just naming a fighter, entering the arena, and fighting 3 monsters to win, but I plan to expand it as I learn more about C#."
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
        description: "This portfolio"
    }
];

const projectsDiv = document.getElementById("projects");

projectItems.forEach((projectItem) => {
    const { title, url, description, image } = projectItem;

    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project-item");

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("project-title");
    titleDiv.innerHTML = `<a href="${url}">${title}</a>`;
    projectContainer.appendChild(titleDiv);

    if (image) {
        const img = document.createElement("img");
        img.src = image;
        img.alt = `${title} screenshot`;
        img.classList.add("project-image");
        projectContainer.appendChild(img);
    }

    const descDiv = document.createElement("div");
    descDiv.classList.add("project-desc");
    descDiv.textContent = description;
    projectContainer.appendChild(descDiv);

    projectContainer.addEventListener("click", () => {
        projectContainer.classList.toggle("active");
    });

    projectsDiv.appendChild(projectContainer);
});



class Reference {
    constructor(name, email, company = "") {
        this.id = crypto.randomUUID();
        this.name = name;
        this.company = company;
        this.email = email;
    }
}

class Testimonial {
    constructor(referenceId, comment, rating) {
        this.id = crypto.randomUUID();
        this.referenceId = referenceId;
        this.comment = comment;
        this.rating = Number(rating);
    }
}

class ReferenceDao {
    getAll() { throw new Error("Not implemented"); }
    create(reference) { throw new Error("Not implemented"); }
}

class TestimonialDao {
    getAll() { throw new Error("Not implemented"); }
    create(testimonial) { throw new Error("Not implemented"); }
}

class LocalStorageReferenceDao extends ReferenceDao {
    constructor() {
        super();
        this.key = "references";
    }

    getAll() {
        const referencesAsJSON = localStorage.getItem(this.key);
        const referencesData = referencesAsJSON ? JSON.parse(referencesAsJSON) : referenceSeeds;
        return referencesData.map((r) => {
            console.log(r);
            const reference = new Reference(r.name, r.email, r.company);
            reference.id = r.id;
            return reference;
        });
    }

    create(reference) {
        const references = this.getAll();
        references.push(reference);
        localStorage.setItem(this.key, JSON.stringify(references));
    }
}

class LocalStorageTestimonialDao extends TestimonialDao {
    constructor() {
        super();
        this.key = "testimonials";
    }

    getAll() {
        return JSON.parse(localStorage.getItem(this.key) || "[]").map((t) => {
            const testimonial = new Testimonial(t.referenceId, t.comment, t.rating);
            testimonial.id = t.id;
            return testimonial;
        });
    }

    create(testimonial) {
        const testimonials = this.getAll();
        testimonials.push(testimonial);
        localStorage.setItem(this.key, JSON.stringify(testimonials));
    }
}

function getCookie(name) {
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="))
        ?.split("=")[1];
}

function setCookie(name, value) {
    document.cookie = `${name}=${value}; path=/`;
}

class CookieReferenceDao extends ReferenceDao {
    getAll() {
        const raw = getCookie("references");
        return JSON.parse(raw || "[]").map((r) => {
            const reference = new Reference(r.name, r.email, r.company);
            reference.id = r.id;
            return reference;
        });
    }

    create(reference) {
        const references = this.getAll();
        references.push(reference);
        setCookie("references", JSON.stringify(references));
    }
}

const referenceSeeds = [
    new Reference("Jane Doe", "jane@example.com", "Acme Co"),
    new Reference("John Smith", "john@sample.com", "North Ridge Tech"),
    new Reference("Maya Patel", "maya@example.com", "")
];

class CookieTestimonialDao extends TestimonialDao {
    getAll() {
        const raw = getCookie("testimonials");
        return JSON.parse(raw || "[]").map((t) => {
            const testimonial = new Testimonial(t.referenceId, t.comment, t.rating);
            testimonial.id = t.id;
            return testimonial;
        });
    }

    create(testimonial) {
        const testimonials = this.getAll();
        testimonials.push(testimonial);
        setCookie("testimonials", JSON.stringify(testimonials));
    }
}

function getAverageRating(testimonials) {
    if (testimonials.length === 0) return 0;
    const total = testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0);
    return total / testimonials.length;
}

const referenceDao = new LocalStorageReferenceDao();
const testimonialDao = new LocalStorageTestimonialDao();

if (referenceDao.getAll().length === 0) {
    referenceSeeds.forEach((reference) => referenceDao.create(reference));
}

let references = referenceDao.getAll();

if (testimonialDao.getAll().length === 0) {
    const testimonialSeeds = [
        new Testimonial(references[0].id, "Very professional and reliable.", 5),
        new Testimonial(references[1].id, "Great communication and quality work.", 4),
        new Testimonial(references[2].id, "Would absolutely recommend them.", 5)
    ];
    testimonialSeeds.forEach((testimonial) => testimonialDao.create(testimonial));
}

const referencesList = document.getElementById("references-list");
const testimonialsList = document.getElementById("testimonials-list");
const averageRatingH3 = document.getElementById("average-rating");
const referenceForm = document.getElementById("reference-form");

function renderReferencesAndTestimonials() {
    references = referenceDao.getAll();
    const testimonials = testimonialDao.getAll();

    referencesList.innerHTML = "";
    testimonialsList.innerHTML = "";

    references.forEach((reference) => {
        const li = document.createElement("li");
        const referenceTestimonials = testimonials.filter(
            (testimonial) => testimonial.referenceId === reference.id
        );

        li.innerHTML = `
            <strong>${reference.name}</strong>
            ${reference.company ? ` - ${reference.company}` : ""}
            <div>${reference.email}</div>
        `;

        if (referenceTestimonials.length > 0) {
            const nestedList = document.createElement("ul");
            referenceTestimonials.forEach((testimonial) => {
                const nestedLi = document.createElement("li");
                nestedLi.textContent = `${testimonial.rating}/5 - ${testimonial.comment}`;
                nestedList.appendChild(nestedLi);
            });
            li.appendChild(nestedList);
        }

        referencesList.appendChild(li);
    });

    testimonials.forEach((testimonial) => {
        const li = document.createElement("li");
        const reference = references.find((r) => r.id === testimonial.referenceId);
        li.textContent = `${reference ? reference.name : "Unknown"}: ${testimonial.rating}/5 - ${testimonial.comment}`;
        testimonialsList.appendChild(li);
    });

    averageRatingH3.textContent = `Average Rating: ${getAverageRating(testimonials).toFixed(1)}`;
}

referenceForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get("name");
    const company = formData.get("company");
    const email = formData.get("email");
    const comment = formData.get("comment");
    const rating = formData.get("rating");

    const newReference = new Reference(name, email, company);
    referenceDao.create(newReference);

    if (comment && rating) {
        const newTestimonial = new Testimonial(newReference.id, comment, rating);
        testimonialDao.create(newTestimonial);
    }

    event.target.reset();
    renderReferencesAndTestimonials();
});

renderReferencesAndTestimonials();


