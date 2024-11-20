// Project Carousel JavaScript

// Initial index for the project carousel
let currentProject = 0;

// Select all project slides and project names
const projects = document.querySelectorAll(".project-slide");
const projectNames = document.querySelectorAll(".project-name");

// Function to display the project at the specified index
function showProject(index) {
  // Hide all projects and only show the selected one
  projects.forEach((project, i) => {
    project.classList.toggle("active", i === index);
  });

  // Update the active project name
  projectNames.forEach((name, i) => {
    name.classList.toggle("active", i === index);
  });

  currentProject = index;

  // Scroll the active project name into view
  projectNames[index].scrollIntoView({ behavior: 'smooth', inline: 'center' });
}

// Function to go to the previous project in the carousel
function prevProject() {
  let newIndex = currentProject - 1;
  if (newIndex < 0) {
    newIndex = projects.length - 1;
  }
  showProject(newIndex);
}

// Function to go to the next project in the carousel
function nextProject() {
  let newIndex = currentProject + 1;
  if (newIndex >= projects.length) {
    newIndex = 0;
  }
  showProject(newIndex);
}

// Function to go to a specific project
function goToProject(index) {
  showProject(index);
}

// Add event listeners to project names for clickable navigation
projectNames.forEach((name, index) => {
  name.addEventListener("click", () => {
    goToProject(index);
  });
});

// Initial display of the first project in the carousel
document.addEventListener("DOMContentLoaded", () => {
  showProject(currentProject);
});
