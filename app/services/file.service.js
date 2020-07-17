const request = require('request');
const uuid = require('uuid-random');
const fs = require('fs');

const download = async (url, numberOfImages, prefix = '') => {
    const folderName = uuid();
    const path = 'storage/temp/' + folderName;
    fs.mkdirSync(path, {recursive: true});
    const listOfPromise = [];
    for (let i = 0; i < numberOfImages; i++) {
        let name = (i + 1) + '.jpg';
        if (prefix) {
            name = prefix + '-' + name;
        }
        const filePath = path + '/' + name;
        const stream = fs.createWriteStream(filePath);
        const pr = new Promise((resolve, reject) => {
            console.log('---start: ' + filePath);
            request.head(url, (err, res, body) => {
                request(url).pipe(stream)
            });
            stream.on('close', () => {
                resolve();
            });
        });
        listOfPromise.push(pr);
    }

    await Promise.all(listOfPromise);
    return folderName;
}

module.exports = {
    download
}
