// Function to add an item to the budget list
function addItem() {
    // Obtain the user input from form fields
    const itemType = document.getElementById('itemType').value;
    const itemName = document.getElementById('name').value.trim();
    const itemAmount = parseFloat(document.getElementById('amount').value);

    // Validate input fields
    if (validateInput(itemName, itemAmount)) {
        // Add item to the table and update totals
        addTableRow(itemName, itemAmount, itemType);
        updateTotals(itemType, itemAmount);
        clearInputFields();
    } else {
        alert("Please fill in all fields correctly.");
    }
}

// Validate user input
function validateInput(name, amount) {
    return name !== '' && !isNaN(amount) && amount > 0;
}

// Add a new row to the table with the item details
function addTableRow(name, amount, type) {
    const table = document.getElementById('table');
    const newRow = table.insertRow(); // Automatically adds at the end
    newRow.insertCell(0).innerText = table.rows.length - 1; // Adjust S.no. based on the existing number of rows
    newRow.insertCell(1).innerText = name; // Insert the item's name
    newRow.insertCell(2).innerText = amount.toFixed(2); // Insert the amount, formatted to 2 decimal places
    newRow.insertCell(3).innerText = type; // Insert the type (Income/Expense)
    const deleteCell = newRow.insertCell(4); // Prepare a cell for the delete button
    deleteCell.appendChild(createDeleteButton()); // Append the delete button to the cell
}

// Create a delete button for table rows
function createDeleteButton() {
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.onclick = function() {
        deleteItem(this);
    };
    return deleteBtn;
}

// Update the total income, expenses, and balance
function updateTotals(type, amount) {
    const totalIncome = document.getElementById('updatedInc');
    const totalExpenses = document.getElementById('updatedExp');
    const balance = document.getElementById('updatedBal');

    if (type === 'Income') {
        totalIncome.innerText = (parseFloat(totalIncome.innerText) + amount).toFixed(2);
    } else {
        totalExpenses.innerText = (parseFloat(totalExpenses.innerText) + amount).toFixed(2);
    }
    balance.innerText = (parseFloat(totalIncome.innerText) - parseFloat(totalExpenses.innerText)).toFixed(2);
}

// Clear input fields after adding an item
function clearInputFields() {
    document.getElementById('name').value = '';
    document.getElementById('amount').value = '';
}

// Function to handle the deletion of a budget item
function deleteItem(button) {
    const row = button.parentElement.parentElement; // Navigate from button to row
    const amount = parseFloat(row.cells[2].innerText);
    const type = row.cells[3].innerText;

    // Reverse the type for correction and update totals
    updateTotals(type === 'Income' ? 'Expense' : 'Income', -amount);
    row.remove(); // Remove the item row from the table
    reindexTable(); // Update row indices
}

// Re-index the table after deleting a row
function reindexTable() {
    const table = document.getElementById('table');
    for (let i = 1; i < table.rows.length; i++) {
        table.rows[i].cells[0].innerText = i; // Update serial numbers to reflect new order
    }
}
// Updated addItem function with date handling
function addItem() {
    const itemType = document.getElementById('itemType').value;
    const itemName = document.getElementById('name').value.trim();
    const itemAmount = parseFloat(document.getElementById('amount').value);
    const itemDate = document.getElementById('date').value; // Assuming you added a date input with id 'date'

    if (validateInput(itemName, itemAmount, itemDate)) { // You'll need to update your validateInput function as well
        addTableRow(itemName, itemAmount, itemType, itemDate); // Modify this function to handle the date
        updateTotals(itemType, itemAmount);
        clearInputFields();
    } else {
        alert("Please fill in all fields correctly.");
    }
}
// Function to add an item to the budget list
function addItem() {
    const itemType = document.getElementById('itemType').value;
    const itemName = document.getElementById('name').value.trim();
    const itemAmount = parseFloat(document.getElementById('amount').value);

    if (itemName !== '' && !isNaN(itemAmount) && itemAmount > 0) { // Simplified validation
        addTableRow(itemName, itemAmount, itemType);
        updateTotals(itemType, itemAmount);
        clearInputFields();
    } else {
        alert("Please fill in all fields correctly.");
    }
}

// Function to add a new row to the table
function addTableRow(name, amount, type) {
    const table = document.getElementById('table');
    const newRow = table.insertRow();
    newRow.insertCell(0).innerText = table.rows.length;
    newRow.insertCell(1).innerText = name;
    newRow.insertCell(2).innerText = amount.toFixed(2);
    newRow.insertCell(3).innerText = type;
    const deleteCell = newRow.insertCell(4);
    const deleteBtn = createDeleteButton();
    deleteCell.appendChild(deleteBtn);
}

// Function to create a delete button for each table row
function createDeleteButton() {
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.onclick = function() {
        const row = this.parentElement.parentElement;
        const amount = parseFloat(row.cells[2].innerText);
        const type = row.cells[3].innerText;
        updateTotals(type === 'Credited' ? 'Debited' : 'Credited', -amount); // Reverse the operation
        row.remove();
        reindexTable();
    };
    return deleteBtn;
}

// Function to update total amounts
function updateTotals(type, amount) {
    const totalInc = document.getElementById('updatedInc');
    const totalExp = document.getElementById('updatedExp');
    const balance = document.getElementById('updatedBal');

    if (type === 'Credited') {
        totalInc.innerText = (parseFloat(totalInc.innerText) + amount).toFixed(2);
    } else {
        totalExp.innerText = (parseFloat(totalExp.innerText) + amount).toFixed(2);
    }

    balance.innerText = (parseFloat(totalInc.innerText) - parseFloat(totalExp.innerText)).toFixed(2);
}

// Function to clear the input fields after adding an item
function clearInputFields() {
    document.getElementById('name').value = '';
    document.getElementById('amount').value = '';
}

// Function to reindex the table after a row is deleted
function reindexTable() {
    const table = document.getElementById('table');
    for (let i = 1; i < table.rows.length; i++) {
        table.rows[i].cells[0].innerText = i; // Reindex the serial numbers
    }
}


function addItem() {
    const itemType = document.getElementById('itemType').value;
    const itemName = document.getElementById('name').value.trim();
    const itemAmount = parseFloat(document.getElementById('amount').value);
    const itemCurrency = document.getElementById('currency').value; // Capture the selected currency

    // Validate and add item as before, but include currency information
}


