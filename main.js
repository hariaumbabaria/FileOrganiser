let inputArr = process.argv.slice(2);
let fs = require("fs");
let path = require("path");
let helpObj = require("./commands/help");
let treeObj = require("./commands/tree")
let organiseObj = require("./commands/organise")


switch(inputArr[0])
{
    case "tree":
        treeObj.TreeKey(inputArr[1]);
        break;

    case "organise":
        organiseObj.organiseKey(inputArr[1]);
        break;

    case "help":
        helpObj.helpKey();
        break;

    default:
        console.log("Please Input Right Array"); 
        break;   
}





