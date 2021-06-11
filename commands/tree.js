let fs = require('fs');
let path = require('path');

function treeFn(dirPath)
{
    if(dirPath==undefined)
    {
        treeHelper(process.cwd(), "");
    }
    else
    {
        let checkExist = fs.existsSync(dirPath);
        if(checkExist)
        {
            treeHelper(dirPath, "");
        }
        else
        {
            console.log("Please enter the correct path");
            return;
        }
    }
}

function treeHelper(dirPath, indent)
{
    let isFile = fs.lstatSync(dirPath).isFile();
    if(isFile == true)
    {
        let fileName = path.basename(dirPath);
        console.log(indent + "├──" + fileName);
    }
    else
    {
        let dirName = path.basename(dirPath);
        console.log(indent + "└──" + dirName);
        let file = fs.readdirSync(dirPath);
        for(let i=0; i<file.length; i++)
        {
            let filePath = path.join(dirPath, file[i]);
            treeHelper(filePath, indent + "\t");
        }
    }
}

module.exports = {
    TreeKey: treeFn
}