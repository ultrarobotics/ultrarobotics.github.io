document.addEventListener("DOMContentLoaded", () => {
  const projectFiles = ["project1.html", "project2.html", "project3.html"];
  const carouselContent = document.getElementById("carousel-content");
  let currentIndex = 0;

  // Function to update active classes for all navigation items.
  // This queries the DOM fresh for both the top and bottom navigation lists.
  const updateNavigation = (index) => {
    const navLists = document.querySelectorAll('.project-names');
    navLists.forEach(list => {
      const items = list.querySelectorAll('.project-name');
      items.forEach(item => {
        const idx = parseInt(item.getAttribute('data-index'), 10);
        if (idx === index) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    });
  };

  // Function to load a specific project and update navigation.
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
        currentIndex = index;
        // Use a slight delay so that any re-rendered nav lists are present
        setTimeout(() => updateNavigation(index), 50);
        initializeCarouselFeatures();
      })
      .catch(error => {
        console.error('Error loading project:', error);
        carouselContent.innerHTML = "<p>Failed to load project content.</p>";
      });
  };

  // Use event delegation on each .project-navigation container so that clicks on any nav item update both sets.
  const navContainers = document.querySelectorAll('.project-navigation');
  navContainers.forEach(container => {
    container.addEventListener('click', (event) => {
      const target = event.target.closest('.project-name');
      if (target) {
        const idx = parseInt(target.getAttribute('data-index'), 10);
        loadProject(idx);
      }
    });
  });

  // Previous Project button handler.
  window.prevProject = () => {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) newIndex = projectFiles.length - 1;
    loadProject(newIndex);
  };

  // Next Project button handler.
  window.nextProject = () => {
    let newIndex = (currentIndex + 1) % projectFiles.length;
    loadProject(newIndex);
  };

  // Initial load of the first project.
  loadProject(currentIndex);

  // Also update navigation when the window fully loads to catch any late-rendered elements.
  window.addEventListener('load', () => {
    updateNavigation(currentIndex);
  });

  // Placeholder for initializing any project-specific features.
  function initializeCarouselFeatures() {
    // For example, initialize sliders, galleries, or other interactive elements.
  }
});
