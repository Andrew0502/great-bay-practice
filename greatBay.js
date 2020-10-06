const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", 
    password: "AGCM6equj5!",
    database: "greatBay_db"
});

connection.connect(function(error) {
    if (error) throw error;
    console.log("connected as id " + connection.threadId + "\n");
    // addNewItem("Gold Sculpture", 7000);
    // getItems();
    // connection.end();
    init();
});

function getItems(){
    connection.query("SELECT* FROM items", (error, data) => {
        if (error) throw error;
        console.table(data); // console.table prints things out a bit nicer.
        init();
    });
}

function addNewItem(name, current_bid){
    connection.query("INSERT INTO items SET ? ", {name: name, current_bid: current_bid}, (error, data) => {
        if (error) throw error;
        // console.table(data);
        init();
    });
}

function askUsersForNewItemInfo() {
    inquirer.prompt([{
        name: "itemName",
        message: "What Item would you like to sell",
        type: "input",
        },
        {
            name: "itemPrice",
            message: "What Item would you like your starting bid to be?",
            type: "input",
        }

    ]).then(({itemName, itemPrice})  =>{
        console.log(itemName);
        console.table(itemPrice);
        addNewItem(itemName, itemPrice);
        // getItems();
        
    })
}

function init() {
    inquirer.prompt([
        {
            name: "userSelection",
            message: "What would you like to do",
            type: "list",
            choices: [
                "VIEW ITEMS", "BID", "ADD NEW ITEM", "EXIT"
            ] 
        }   
    ])
.then(({userSelection}) => {
            console.log(userSelection);
            if (userSelection === "VIEW ITEMS"){
                getItems();
            } else if (userSelection === "ADD NEW ITEM"){
                askUsersForNewItemInfo();
            } else if (userSelection === "EXIT"){
                exit();
            } else if (userSelection === "BID"){
                bid();
            }
    });
}

function exit(){
    connection.end();
}

function bid(){
    connection.query("SELECT* FROM items", (error, data) => {
        if (error) throw error;
        const arrayOfItemNames = data.map(item => item.name);
        console.log(arrayOfItemNames);
        inquirer.prompt([
            {
                name: "itemToBidOn",
                message: "What item would you like to bid on?",
                type: "list",
                choices: arrayOfItemNames,
            },
        ])
        .then(({itemToBidOn}) =>{
            console.log(itemToBidOn);
            //ToDo Dynamically accept a bid price.
            //ToDo Ensure the new bid is higher than the current_bid.
            connection.query("UPDATE items SET ? WHERE ?",
            [
              {
                current_bid: 69
              },
              {
                name: itemToBidOn
              }
            ],
            (error, data) => {
              if (error) throw err;
              console.log(data.affectedRows + " items updated!\n");
              init();
            });
        });
    });
}