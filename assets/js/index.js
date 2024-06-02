document.addEventListener('DOMContentLoaded', function() {
    const addBtn = document.getElementById('addBtn');
    const cardsContainer = document.getElementById('cardsContainer');
    const searchInput = document.getElementById('text');
    const searchBtn = document.getElementById('submit');
    const clearBtn = document.getElementById('clrBtn');

    addBtn.addEventListener('click', function() {
        const title = document.getElementById('mtitle').value;
        const description = document.getElementById('mdescription').value;
        
        if (title.trim() === '' || description.trim() === '') {
            alert('Please enter both title and description.');
            return;
        }

        const card = createTaskCard(title, description);
        cardsContainer.appendChild(card);

        // Clear input fields after adding task
        document.getElementById('mtitle').value = '';
        document.getElementById('mdescription').value = '';
    });

    // Function to create a task card
    function createTaskCard(title, description) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col-md-12', 'm-3', 'p-3', 'card', 'mx-auto');

        const cardContent = `
            <div class="form-group">
                <input type="text" class="form-control mb-2" value="${title}" disabled>
                <textarea class="form-control mb-2" disabled>${description}</textarea>
                <button class="btn btn-primary btn-block editBtn">Edit</button>
                <button class="btn btn-primary btn-block deleteBtn">Delete</button>
                <button class="btn btn-success btn-block doneBtn">Mark as Done</button>
            </div>
        `;
        cardDiv.innerHTML = cardContent;

        // Add event listener for edit button
        const editBtn = cardDiv.querySelector('.editBtn');
        editBtn.addEventListener('click', function() {
            const titleInput = cardDiv.querySelector('input');
            const descriptionTextarea = cardDiv.querySelector('textarea');
            if (editBtn.textContent === 'Edit') {
                editBtn.textContent = 'Save';
                titleInput.disabled = false;
                descriptionTextarea.disabled = false;
            } else {
                editBtn.textContent = 'Edit';
                titleInput.disabled = true;
                descriptionTextarea.disabled = true;
            }
        });

        // Add event listener for delete button
        const deleteBtn = cardDiv.querySelector('.deleteBtn');
        deleteBtn.addEventListener('click', function() {
            cardDiv.remove();
        });

        // Add event listener for "Mark as Done" button
        const doneBtn = cardDiv.querySelector('.doneBtn');
        doneBtn.addEventListener('click', function() {
            const titleInput = cardDiv.querySelector('input');
            if (!cardDiv.classList.contains('done')) {
                titleInput.style.textDecoration = 'line-through';
                doneBtn.textContent = 'Pending';
            } else {
                titleInput.style.textDecoration = 'none';
                doneBtn.textContent = 'Mark as Done';
            }
            cardDiv.classList.toggle('done');
        });

        return cardDiv;
    }

    // Search functionality
    searchBtn.addEventListener('click', function() {
        const searchText = searchInput.value.trim().toLowerCase();
        const cards = cardsContainer.getElementsByClassName('card');

        for (const card of cards) {
            const title = card.querySelector('input').value.toLowerCase();
            const description = card.querySelector('textarea').value.toLowerCase();
            if (title.includes(searchText) ) {
                document.getElementById('mtitle').value = title;
                document.getElementById('mdescription').value = description;
            }
        }
    });

    // clear functionality
    clearBtn.addEventListener('click', function() {
        document.getElementById('mtitle').value = " ";
        document.getElementById('mdescription').value = " ";
    });



});
