const fs = require("fs").promises;
const mv = require("mv");
const find = require("find");
const mkdirp = require("mkdirp");

const filePattern = /alarm_(\d{8})_\d{6}\.mkv/;
const sourcePath = "/a/b/c";
const destinationPath = "/a/b/c";

function getFileName(path = "") {
    const split = path.split("/");
    return split[split.length - 1];
}

function findFilesAndMoveToFolder(pattern, path) {
    const today = new Date();
    const yearOfToday = today.getFullYear();
    const monthOfToday = today.getMonth() + 1;
    const dateOfToday = today.getDate();

    return find.eachfile(pattern, path, async function(file) {
        const fileName = getFileName(file);
        const match = fileName.match(/(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})/i);
        const year = match.groups?.year;
        const month = match.groups?.month;
        const day = match.groups?.day;
        const folderName = "(year)_(month)_(day)"
            .replace(/\(year\)/, year)
            .replace(/\(month\)/, month)
            .replace(/\(day\)/, day);
        const finalDestinationPath = `${destinationPath}/${folderName}/${fileName}`;

        if (yearOfToday == year && monthOfToday == month && dateOfToday == day) return;
        
        await createDirectory(destinationPath, folderName);
        mv(file, finalDestinationPath, { mkdirp: true }, function(err) {});
    });
}

function createDirectory(path, name = "") {
    return mkdirp.sync(`${path}/${name}`, { recursive: true });
}

async function run() {
    await findFilesAndMoveToFolder(filePattern, sourcePath);
}

run();
