let expenses = [];
let incomes = [];
document.getElementById('add-transaction-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const date = document.getElementById('transaction-date').value;
    const category = document.getElementById('transaction-category').value;
    const type = document.querySelector('input[name="transaction-type"]:checked').value;
    const amount = parseFloat(document.getElementById('transaction-amount').value);
    if (type === 'expense') {
        expenses.push({ date, category, amount });
        updateExpensesTable();
    } else {
        incomes.push({ date, category, amount });
        updateIncomesTable();
    }
    updateTotalExpenses();
    updateTotalIncomes();
    updateProfitLoss();
    document.getElementById('add-transaction-form').reset();
});
document.getElementById('edit-expense-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const index = document.getElementById('edit-expense-index').value;
    const date = document.getElementById('edit-expense-date').value;
    const category = document.getElementById('edit-expense-category').value;
    const amount = parseFloat(document.getElementById('edit-expense-amount').value);
    expenses[index] = { date, category, amount };
    updateExpensesTable();
    updateTotalExpenses();
    updateProfitLoss();
    document.getElementById('expense-edit-modal').classList.remove('is-active');
});
document.getElementById('edit-income-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const index = document.getElementById('edit-income-index').value;
    const date = document.getElementById('edit-income-date').value;
    const category = document.getElementById('edit-income-category').value;
    const amount = parseFloat(document.getElementById('edit-income-amount').value);
    incomes[index] = { date, category, amount };
    updateIncomesTable();
    updateTotalIncomes();
    updateProfitLoss();
    document.getElementById('income-edit-modal').classList.remove('is-active');
});
function updateExpensesTable() {
    const tbody = document.getElementById('expenses-tbody');
    tbody.innerHTML = '';
    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.date}</td>
            <td>${expense.category}</td>
            <td>$${expense.amount}</td>
            <td>
                <button class="button is-small is-primary" onclick="editExpense(${index})">Edit</button>
                <button class="button is-small is-danger" onclick="deleteExpense(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}
function updateIncomesTable() {
    const tbody = document.getElementById('incomes-tbody');
    tbody.innerHTML = '';
    incomes.forEach((income, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${income.date}</td>
            <td>${income.category}</td>
            <td>$${income.amount}</td>
            <td>
                <button class="button is-small is-primary" onclick="editIncome(${index})">Edit</button>
                <button class="button is-small is-danger" onclick="deleteIncome(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}
function updateTotalExpenses() {
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    document.getElementById('total-expenses').innerText = `Total Expenses: $${total}`;
}
function updateTotalIncomes() {
    const total = incomes.reduce((acc, income) => acc + income.amount, 0);
    document.getElementById('total-incomes').innerText = `Total Incomes: $${total}`;
}
function updateProfitLoss() {
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const totalIncomes = incomes.reduce((acc, income) => acc + income.amount, 0);
    const profitLoss = totalIncomes - totalExpenses;
    if (profitLoss > 0) {
        document.getElementById('profit-loss').innerText = `Profit: $${profitLoss}`;
        document.getElementById('profit-loss').classList.add('profit');
        document.getElementById('profit-loss').classList.remove('loss');
    } else if (profitLoss < 0) {
        document.getElementById('profit-loss').innerText = `Loss: $${-profitLoss}`;
        document.getElementById('profit-loss').classList.add('loss');
        document.getElementById('profit-loss').classList.remove('profit');
    } else {
        document.getElementById('profit-loss').innerText = 'Break Even';
        document.getElementById('profit-loss').classList.remove('profit');
        document.getElementById('profit-loss').classList.remove('loss');
    }
}
function editExpense(index) {
    const expense = expenses[index];
    document.getElementById('edit-expense-index').value = index;
    document.getElementById('edit-expense-date').value = expense.date;
    document.getElementById('edit-expense-category').value = expense.category;
    document.getElementById('edit-expense-amount').value = expense.amount;
    document.getElementById('expense-edit-modal').classList.add('is-active');
    document.getElementById('close-expense-edit-modal').addEventListener('click', () => {
        document.getElementById('expense-edit-modal').classList.remove('is-active');
    });
}
function editIncome(index) {
    const income = incomes[index];
    document.getElementById('edit-income-index').value = index;
    document.getElementById('edit-income-date').value = income.date;
    document.getElementById('edit-income-category').value = income.category;
    document.getElementById('edit-income-amount').value = income.amount;
    document.getElementById('income-edit-modal').classList.add('is-active');
    document.getElementById('close-income-edit-modal').addEventListener('click', () => {
        document.getElementById('income-edit-modal').classList.remove('is-active');
    });
}
function deleteExpense(index) {
    expenses.splice(index, 1);
    updateExpensesTable();
    updateTotalExpenses();
    updateProfitLoss();
}
function deleteIncome(index) {
    incomes.splice(index, 1);
    updateIncomesTable();
    updateTotalIncomes();
    updateProfitLoss();
}