document.addEventListener("DOMContentLoaded", function () {

    let peopleBirthdates = [];

    if (localStorage.getItem("list") === null) {
        // base list of people and their birthdates
        peopleBirthdates = [
            { id: 1, name: "Ace", birthdate: "2006-02-21", notes: "Example" }
        ];
    } else {
        peopleBirthdates = JSON.parse(localStorage.getItem("list")); // Parse the stored string back to an array
    }

    peopleBirthdates

    // Function to calculate age based on birthdate
    function calculateAge(birthdate) {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    // Function to format birthdate in written out form
    function formatBirthdateWrittenOut(birthdate) {
        if (new Date(birthdate).getFullYear() == 1) {
            const options = { month: "long", day: "numeric" };
            return new Date(birthdate).toLocaleDateString("en-US", options);
        } else {
            const options = { year: "numeric", month: "long", day: "numeric" };
            return new Date(birthdate).toLocaleDateString("en-US", options);
        }
    }

    // Function to format birthdate in normal format
    function formatBirthdateNormal(birthdate) {
        if (new Date(birthdate).getFullYear() == 1) {
            const options = { month: "2-digit", day: "2-digit" };
            return new Date(birthdate).toLocaleDateString("en-US", options);
        } else {
            const options = { year: "numeric", month: "2-digit", day: "2-digit" };
            return new Date(birthdate).toLocaleDateString("en-US", options);
        }
    }

    function timeUntilNextBirthday(birthdate) {
        // Parse the birthdate string into a Date object
        const birthDate = new Date(birthdate);

        // Get today's date
        const today = new Date();

        // Set the birthdate for this year
        const nextBirthdayThisYear = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

        // If the birthday has already occurred this year, set it for next year
        if (today > nextBirthdayThisYear) {
            nextBirthdayThisYear.setFullYear(today.getFullYear() + 1);
        }

        // Calculate the difference in milliseconds between now and the next birthday
        const difference = nextBirthdayThisYear.getTime() - today.getTime();

        // Calculate the days, hours, minutes, and seconds until the next birthday
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Return an object with the time until the next birthday
        return `${days} days`;
    }

    function addPerson(name, birthdate, notes) {
        // Create a new person object with the entered data
        const newPerson = {
            // id: random id or incrementing but gotta find highest number if incrementing and make sure its unique if random
            // id will be used for deleting/editing specific people is this possible with a list?
            name: name,
            birthdate: birthdate,
            notes: notes
        };

        // Append the new person to the peopleBirthdates array
        peopleBirthdates.push(newPerson);

        // Store the peopleBirthdates array in Local Storage
        localStorage.setItem("list", JSON.stringify(peopleBirthdates));

        // Clear the form fields
        document.getElementById("name").value = "";
        document.getElementById("birthdate").value = "";
        document.getElementById("notes").value = "";

        // Call function to update the table with the new data
        updateTable();
    }

    function updateTable() {
        // Get the table body
        const tbody = document.querySelector("#birthdates tbody");

        // Clear existing rows from the table body
        tbody.innerHTML = "";

        // Loop through each person in the list
        peopleBirthdates.forEach(person => {
            // Create a new row
            const row = document.createElement("tr");

            // Create cells for each property of the person
            const nameCell = document.createElement("td");
            nameCell.textContent = person.name;
            row.appendChild(nameCell);

            const ageCell = document.createElement("td");
            if (new Date(person.birthdate).getFullYear() == 1) {
                ageCell.textContent = "Unknown";
            } else {
                ageCell.textContent = calculateAge(person.birthdate);
            }
            row.appendChild(ageCell);

            const birthdayInCell = document.createElement("td");
            birthdayInCell.textContent = timeUntilNextBirthday(person.birthdate);
            row.appendChild(birthdayInCell);

            const birthdateWrittenOutCell = document.createElement("td");
            birthdateWrittenOutCell.textContent = formatBirthdateWrittenOut(person.birthdate);
            row.appendChild(birthdateWrittenOutCell);

            const birthdateNormalCell = document.createElement("td");
            birthdateNormalCell.textContent = formatBirthdateNormal(person.birthdate);
            row.appendChild(birthdateNormalCell);

            const notesCell = document.createElement("td");
            notesCell.textContent = person.notes;
            row.appendChild(notesCell);

            // Append the row to the table body
            tbody.appendChild(row);
        });
    }

    // Add event listener to the form for submitting new person data
    const addPersonForm = document.getElementById("addPersonForm");
    addPersonForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const birthdate = document.getElementById("birthdate").value;
        const notes = document.getElementById("notes").value;
        addPerson(name, birthdate, notes);
    });

    // Initial table rendering
    updateTable();

    // Initialize DataTables plugin
    new DataTable('#birthdates');
});
