document.addEventListener("DOMContentLoaded", () => {
  const projectFiles = ["project1.html", "project2.html", "project3.html"];
  let currentIndex = 0;

  const carouselSection = document.getElementById("projects-carousel");
  const carouselContent = document.getElementById("carousel-content");

  // Load the project partial into #carousel-content
  function loadProject(index) {
    // Wrap around if out of range
    if (index < 0) index = projectFiles.length - 1;
    if (index >= projectFiles.length) index = 0;

    fetch(`projects/${projectFiles[index]}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.text();
      })
      .then((html) => {
        currentIndex = index;
        carouselContent.innerHTML = html;
        updateNavigation(); // highlight the correct nav item
      })
      .catch((err) => {
        console.error("Error loading project:", err);
        carouselContent.innerHTML = "<p>Failed to load project content.</p>";
      });
  }

  // Update both top and bottom navigation bars
  function updateNavigation() {
    // Grab all the lists with class "project-names"
    const navLists = document.querySelectorAll(".project-names");
    navLists.forEach((navList) => {
      // For each list item inside
      navList.querySelectorAll(".project-name").forEach((item) => {
        const idx = parseInt(item.getAttribute("data-index"), 10);
        // Toggle "active" if it matches the currentIndex
        item.classList.toggle("active", idx === currentIndex);
      });
    });
  }

  // EVENT DELEGATION on the entire #projects-carousel section
  carouselSection.addEventListener("click", (event) => {
    // Check if the clicked element was a prev/next arrow
    const arrowBtn = event.target.closest(".project-nav-btn");
    if (arrowBtn) {
      const direction = arrowBtn.dataset.direction;
      if (direction === "prev") {
        loadProject(currentIndex - 1);
      } else if (direction === "next") {
        loadProject(currentIndex + 1);
      }
      return; // stop here
    }

    // Check if the clicked element was a project-name item
    const navItem = event.target.closest(".project-name");
    if (navItem) {
      const idx = parseInt(navItem.dataset.index, 10);
      loadProject(idx);
    }
  });

  // INITIAL LOAD
  loadProject(currentIndex);
});
