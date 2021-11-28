const fs = require("fs").promises;
const find = require("find");
const mkdirp = require("mkdirp");
const path = require("path");
const { program } = require("commander");

program
    .requiredOption('-p, --pattern <pattern>', 'pattern must have')
    .option('-s, --source <source>')
    .option('-d, --destination <destination>');

program.parse();

const options = program.opts();
const filePattern = new RegExp(options.pattern);
const sourcePath = options.source || path.resolve(__dirname);
const destinationPath = options.destination || path.resolve(__dirname);

function getFileName(path = "") {
    const split = path.split(/\/|\\/);
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
        fs.rename(file, finalDestinationPath);
    });
}

function createDirectory(path, name = "") {
    return mkdirp.sync(`${path}/${name}`, { recursive: true });
}

async function run() {
    await findFilesAndMoveToFolder(filePattern, sourcePath);
}

run();
