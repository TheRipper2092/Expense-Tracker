let expenses = [];

document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;

    if (!description || isNaN(amount) || !date ) {
        alert('Please fill in all details');
        return;
    }

    expenses.push({ description, amount, date });
    updateReport();
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('date').value = '';
});

function updateReport() {
    const today = new Date();
    const currentMonth = today.toLocaleString('default', { month: 'long' });
    const currentYear = today.getFullYear();

    let totalExpense = 0;

    const monthlyExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === today.getMonth() && expenseDate.getFullYear() === today.getFullYear();
    });

    const reportContainer = document.getElementById('expenseReport');
    reportContainer.innerHTML = `<h3>${currentMonth} ${currentYear} Expenses</h3>`; 
    reportContainer.innerHTML += '<table>\n<thead>\n\n\n<tr>\n<th>Description</th>\n\n\n<th>Amount</th>\n\n\n<th>Date</th>\n\n\n</tr>\n\n\n</thead>\n\n\n<tbody>';



    monthlyExpenses.forEach(expense => {
        reportContainer.innerHTML += `<br><tr><td>${expense.description}</td>\n\n\n<td>$${expense.amount.toFixed(2)}</td>\n\n\n<td>${expense.date}</td></tr><br>`;
        totalExpense += expense.amount;
    });

    reportContainer.innerHTML += `</tbody></table>`;
    reportContainer.innerHTML += `<p>Total Expenses: $${totalExpense.toFixed(2)}</p>`;
}
// ... Existing JavaScript code ...
function downloadExpenseReport() {
    // Validate if expenses array is empty
    if (expenses.length === 0) {
        alert('No expenses added yet.');
        return;
    }

    // Create CSV content
    let csvContent = "Date,Description,Amount\n";
    expenses.forEach(expense => {
        csvContent += `${expense.date},${expense.description},${expense.amount}\n`;
    });

    // Create a Blob object with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a temporary anchor element and set its attributes
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'monthly_expense_report.csv');

    // Append the anchor element to the body and programmatically click it to trigger the download
    document.body.appendChild(link);
    link.click();

    // Remove the anchor element from the body
    document.body.removeChild(link);
}

// Event listener for form submission
document.getElementById('expenseForm').addEventListener('submit', addExpense);

