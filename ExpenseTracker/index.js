
document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    for (let i = 0; i < expenses.length; i++) {
        display(expenses[i]);
    }

    sessionStorage.removeItem('editingExpenseId');
}


function handleFormSubmit(event) {
    event.preventDefault();
    const amount = document.getElementById('amt').value;
    const description = document.getElementById('desc').value;
    const category = document.getElementById('category').value;

    const expense = {  
        id :Date.now(),
        amount,
        description, 
        category
    };

    if(sessionStorage.getItem('editingExpenseId')) {
        updateExpense(sessionStorage.getItem('editingExpenseId'),expense);
        document.getElementById('submit-btn').textContent = 'Add Expense';
    } else {
        addExpense(expense);
    }

    event.target.reset();
}

function addExpense(expense) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    display(expense);
}

function updateExpense(id, updatedExpense) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    
      for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].id == id) {
            expenses[i].amount = updatedExpense.amount;
            expenses[i].description = updatedExpense.description;
            expenses[i].category = updatedExpense.category;
        }
    }

    localStorage.setItem('expenses', JSON.stringify(expenses));

    const li = document.getElementById(id);
    li.firstChild.textContent = `${updatedExpense.amount} ${updatedExpense.description} ${updatedExpense.category}`;
    sessionStorage.removeItem('editingExpenseId');
}

function display(expense) {

    const ul = document.querySelector('ul');
    const li = document.createElement('li');

    li.id = expense.id; 

    li.innerHTML = `${expense.amount} - ${expense.description} - ${expense.category} <button class="delete-btn">Delete Expense</button> <button class="edit-btn">Edit Expense</button>`;

    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function() {
        deleteExpense(expense.id, li);
    });

    const editBtn = li.querySelector('.edit-btn');
    editBtn.addEventListener('click', function() {
        editExpense(expense, li);
    });

    ul.appendChild(li);
}

function deleteExpense(id, li) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    li.remove();
}


function editExpense(expense, li) {
    document.getElementById('amt').value = expense.amount;
    document.getElementById('desc').value = expense.description;
    document.getElementById('category').value = expense.category;

    sessionStorage.setItem('editingExpenseId', expense.id);

    document.getElementById('submit-btn').textContent = 'Update Expense';
}
