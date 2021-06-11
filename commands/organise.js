let utility = require("../utility");
let fs = require('fs');
let path = require('path');

function organiseFn(dirPath)
{
    let reqPath;
    if(dirPath==undefined)
    {
        reqPath = process.cwd();
        return;
    }
    else
    {
        let checkExist = fs.existsSync(dirPath);
        if(checkExist)
        {
            reqPath = path.join(dirPath, "organised_path");
            if(fs.existsSync(reqPath==false))
            {
                fs.mkdirSync(reqPath);
            }
        }
        else
        {
            console.log("Please enter the correct path");
            return;
        }
    }

    organizer(dirPath, reqPath);

}

function organizer(source, dest)
{
    let fileNames = fs.readdirSync(source);
    // console.log(fileNames);

    for(let i=0; i<fileNames.length; i++)
    {
        let fileAddress = path.join(source, fileNames[i]);
        let isFile = fs.lstatSync(fileAddress).isFile();
        if(isFile)
        {
            // console.log(fileNames[i]);
            let category = getCategory(fileNames[i]);
            console.log(fileNames[i]," belongs to this category ->", category);
            sendFiles(fileAddress, dest, category);
        }
    }

}

function sendFiles(srcfile, dest, category)
{
    let categoryPath = path.join(dest, category);
    if(fs.existsSync(categoryPath)==false)
    {
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcfile);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcfile, destFilePath);
    fs.unlinkSync(srcfile);
    console.log(fileName, " copied to ", category);
}

function getCategory(name)
{
    let ext = path.extname(name);
    ext = ext.slice(1);
    for(let i in utility.types)
    {
        let currTypeArr = utility.types[i];
        for(let j=0; j<currTypeArr.length; j++)
        {
            if(ext == currTypeArr[j])
            {
                return i;
            }
        }
    }
    return "others";
}

module.exports = {
    organiseKey: organiseFn
}