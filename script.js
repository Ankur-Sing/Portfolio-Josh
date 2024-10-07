// Event Listener for "Add Skill" button to show the modal
document.getElementById('add').addEventListener('click', function () {
    document.getElementById('modal').style.display = 'flex'; // Show modal
});

// Event Listener for "Cancel" button to hide the modal and reset the form
document.getElementById('cancel-btn').addEventListener('click', function () {
    document.getElementById('new-skill-form').reset();
    document.getElementById('modal').style.display = 'none'; // Hide modal
});

// Event Listener for form submission
document.getElementById('new-skill-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    // Get the values entered in the form
    const domain = document.getElementById('domain-name').value.trim();
    const skillNames = document.getElementsByName('skill-name[]');
    const skillLevels = document.getElementsByName('skill-level[]');

    // Validate that domain and at least one skill is filled
    if (!domain) {
        alert('Please enter a domain name.');
        return;
    }

    let skillsAdded = false;
    const newSkills = [];

    // Check if any valid skills have been entered
    for (let i = 0; i < skillNames.length; i++) {
        const skillName = skillNames[i].value.trim();
        const skillLevel = skillLevels[i].value;

        if (skillName && skillLevel) {
            skillsAdded = true;
            newSkills.push({ domain, skillName, skillLevel });
        }
    }

    if (!skillsAdded) {
        alert('Please enter at least one valid skill and level.');
        return;
    }

    // Save the new skills to local storage
    saveSkillsToLocalStorage(newSkills);

    // Add new skills to the page
    addSkillsToDOM(newSkills);

    // Reset and hide the form
    document.getElementById('new-skill-form').reset();
    document.getElementById('modal').style.display = 'none'; // Hide modal
});

// Helper function to add skill to a section
function addSkillToSection(skillSection, skillName, skillLevel) {
    const skill = document.createElement('div');
    skill.className = 'skill';

    const skillNameSpan = document.createElement('span');
    skillNameSpan.innerText = skillName;
    const skillLevelSpan = document.createElement('span');
    skillLevelSpan.innerText = `${skillLevel}%`;

    skill.appendChild(skillNameSpan);
    skill.appendChild(skillLevelSpan);

    const progressBar = document.createElement('div');
    progressBar.className = 'skill-bar';

    const progress = document.createElement('div');
    progress.className = 'skill-bar-inner';
    progress.style.width = `${skillLevel}%`;

    progressBar.appendChild(progress);

    skillSection.appendChild(skill);
    skillSection.appendChild(progressBar);
}

// Function to add skills to the DOM
function addSkillsToDOM(skills) {
    skills.forEach(({ domain, skillName, skillLevel }) => {
        // Find the correct section to append the new skills
        let skillSection = Array.from(document.querySelectorAll('.front')).find(section =>
            section.querySelector('h3.sk').innerText === domain
        );

        // If the domain already exists, add skills there; otherwise, create a new section
        if (skillSection) {
            addSkillToSection(skillSection, skillName, skillLevel);
        } else {
            const newSkillBox = document.createElement('div');
            newSkillBox.className = 'front';

            const domainHeader = document.createElement('h3');
            domainHeader.className = 'sk';
            domainHeader.innerText = domain;
            newSkillBox.appendChild(domainHeader);

            addSkillToSection(newSkillBox, skillName, skillLevel);

            // Append the new skill box to the container
            document.querySelector('.contain').appendChild(newSkillBox);
        }
    });
}

// Function to save skills to local storage
function saveSkillsToLocalStorage(skills) {
    let storedSkills = JSON.parse(localStorage.getItem('skills')) || [];
    storedSkills = [...storedSkills, ...skills];
    localStorage.setItem('skills', JSON.stringify(storedSkills));
}

// Function to load skills from local storage and add them to the DOM
function loadSkillsFromLocalStorage() {
    const storedSkills = JSON.parse(localStorage.getItem('skills')) || [];
    addSkillsToDOM(storedSkills);
}

// Load stored skills when the page is loaded
window.onload = function () {
    loadSkillsFromLocalStorage();
};





document.getElementById("contactForm").addEventListener("submit", function(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get form fields
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let subject = document.getElementById("subject").value.trim();
    let message = document.getElementById("message").value.trim();

    // Simple email regex for validation
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate the form fields
    if (name === "") {
      alert("Please enter your name.");
      return;
    }

    if (email === "" || !emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (subject === "") {
      alert("Please enter a subject.");
      return;
    }

    if (message === "") {
      alert("Please enter your message.");
      return;
    }

    // If all fields are valid, you can proceed with form submission
    alert("Form submitted successfully!");

    // Optionally, you can submit the form data using an AJAX request or proceed with default submission
    // this.submit();
  });
  