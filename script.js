income = 0.0;
expense = 0.0;
balance = 0.0;

class Transaction {
    constructor(text, amount, id = new Date().getTime()) {
        this.id = id;
        this.text = text;
        this.amount = amount;
    }

    addTransaction(update = false) {
        if (!update) localStorage.setItem(this.id, [this.text, this.amount]);
        let list = document.getElementById("list");

        let listItem = document.createElement("li");
        if (this.amount >= 0) listItem.className = "plus";
        else listItem.className = "minus";

        let text = document.createElement("span");
        text.textContent = this.text;

        let amount = document.createElement("span");
        amount.textContent = this.amount;

        let deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "delete";
        deleteButton.onclick = () => {
            listItem.remove();
            this.removeTransaction();
        };
        listItem.appendChild(text);
        listItem.appendChild(amount);
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
        this.setIncomeExpenseAndBalance();
    }

    removeTransaction() {
        localStorage.removeItem(this.id);
        this.setIncomeExpenseAndBalance(true)
    }

    setIncomeExpenseAndBalance(rem = false) {
        let val = parseFloat(this.amount)
        if (val >= 0) {
            income += rem? -val : val
            document.getElementById("money-plus").textContent = "+$" + Math.round(income*100)/100;
        } else {
            expense += rem? -val : val
            document.getElementById("money-minus").textContent = "-$" + Math.abs(Math.round(expense*100)/100);
        }
        balance = income + expense;
        document.getElementById("balance").textContent = "$" + balance;
    }
}

function addTransaction() {
    let text = document.getElementById("text").value;
    let amount = document.getElementById("amount").value;
    let transaction = new Transaction(text, amount);
    transaction.addTransaction();
}

function updatePage() {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let item = localStorage.getItem(key).split(",");
        let transaction = new Transaction(
            item[0],
            parseFloat(item[1]),
            parseInt(key)
        );
        transaction.addTransaction(true);
    }
}

window.onload = () => {
    if (localStorage.length != 0) {
        updatePage();
    }
};