// js/loadProjects.js

document.addEventListener("DOMContentLoaded", () => {
    const projectFiles = ["project1.html", "project2.html", "project3.html"];
    const carouselContent = document.getElementById("carousel-content");
    const projectElements = document.querySelectorAll('.project-name');
    let currentIndex = 0;
  
    // Function to load a specific project
    const loadProject = (index) => {
      if (index < 0 || index >= projectFiles.length) return;
      fetch(`projects/${projectFiles[index]}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then(data => {
          carouselContent.innerHTML = data;
          // Update active class
          projectElements.forEach(el => el.classList.remove('active'));
          projectElements[index].classList.add('active');
          currentIndex = index;
          // Initialize any project-specific scripts or sliders if necessary
          initializeCarouselFeatures();
        })
        .catch(error => {
          console.error('Error loading project:', error);
          carouselContent.innerHTML = "<p>Failed to load project content.</p>";
        });
    };
  
    // Initial load
    loadProject(currentIndex);
  
    // Event listeners for project name clicks
    projectElements.forEach((element, index) => {
      element.addEventListener('click', () => loadProject(index));
    });
  
    // Previous Project
    window.prevProject = () => {
      let newIndex = currentIndex - 1;
      if (newIndex < 0) newIndex = projectFiles.length - 1;
      loadProject(newIndex);
    };
  
    // Next Project
    window.nextProject = () => {
      let newIndex = (currentIndex + 1) % projectFiles.length;
      loadProject(newIndex);
    };
  
    // Placeholder for initializing any project-specific features
    function initializeCarouselFeatures() {
      // If you have sliders, galleries, or other interactive elements within projects,
      // initialize them here. For example, initializing a lightbox for image galleries.
      // Example:
      // initLightbox();
    }
  });
  