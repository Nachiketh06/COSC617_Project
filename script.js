function addItem() {
    const itemType = document.getElementById('itemType').value;
    const itemName = document.getElementById('name').value.trim();
    const itemAmount = parseFloat(document.getElementById('amount').value);

    if (validateInput(itemName, itemAmount)) {
        addTableRow(itemName, itemAmount, itemType);
        updateTotals(itemType, itemAmount);
        clearInputFields();
    } else {
        alert("Please fill in all fields correctly.");
    }
}

function validateInput(name, amount) {
    return name !== '' && !isNaN(amount) && amount > 0;
}

function addTableRow(name, amount, type) {
    const table = document.getElementById('table');
    const newRow = table.insertRow(1); // Automatically adds at the end
    // newRow.insertCell(0).innerText = table.rows.length - 1; // Adjust S.no. based on the existing number of rows
    newRow.insertCell(0).innerText = name; // Insert the item's name
    newRow.insertCell(1).innerText = amount.toFixed(2); // Insert the amount, formatted to 2 decimal places
    newRow.insertCell(2).innerText = type; // Insert the type (Income/Expense)
    const deleteCell = newRow.insertCell(3); // Prepare a cell for the delete button
    deleteCell.appendChild(createDeleteButton()); // Append the delete button to the cell
}


function updateTotals(type, amount) {
    const totalIncome = document.getElementById('updatedInc');
    const totalExpenses = document.getElementById('updatedExp');
    const balance = document.getElementById('updatedBal');

    if (type === 'Credited') {
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
    const amount = parseFloat(row.cells[1].innerText);
    const type = row.cells[2].innerText;
    console.Log(amount);
    // Reverse the type for correction and update totals
    updateTotals(type === "Credited" ? "Credited" : "Debited", -1*amount);
    row.remove(); // Remove the item row from the table
    //reindexTable(); // Update row indices
}

// Re-index the table after deleting a row
// function reindexTable() {
//     const table = document.getElementById('table');
//     for (let i = 1; i < table.rows.length; i++) {
//         table.rows[i].cells[0].innerText = i; // Update serial numbers to reflect new order
//     }
// }

// Function to create a delete button for each table row
function createDeleteButton() {
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.onclick = function() {
        const row = this.parentElement.parentElement;
        const amount = parseFloat(row.cells[1].innerText);
        const type = row.cells[2].innerText;
        updateTotals(type === "Credited" ? "Credited" : "Debited", -amount); // Reverse the operation
        row.remove();
        // reindexTable();
    };
    return deleteBtn;
}



// Function to clear the input fields after adding an item
function clearInputFields() {
    document.getElementById('name').value = '';
    document.getElementById('amount').value = '';
}

// Function to reindex the table after a row is deleted
// function reindexTable() {
//     const table = document.getElementById('table');
//     for (let i = 1; i < table.rows.length; i++) {
//         table.rows[i].cells[0].innerText = i; // Reindex the serial numbers
//     }
// }

