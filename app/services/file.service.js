const request = require('request');
const uuid = require('uuid-random');
const fs = require('fs');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const Jimp = require('jimp');

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

const compress = async (path) => {
    try {
        return imagemin([path + '/*.{jpg,png}'], {
            destination: path,
            plugins: [
                imageminMozjpeg({quality: 90}),
                imageminPngquant({
                    quality: [0.7, 0.9]
                })
            ]
        });
    } catch (e) {
        console.error(e);
        throw new Error('Could not compress these images');
    }
}

const convertPngToJpg = async (path) => {
    try {
        const files = fs.readdirSync(path);
        console.log(files);
        files.map(fileName => {
            if (0 < fileName.indexOf('.png')) {
                const newName = fileName.replace('.png', '.jpg');
                Jimp.read(path + '/' + fileName, function (err, image) {
                    if (err) {
                        console.log(err)
                    } else {
                        image.write(path + '/png/' + newName)
                    }
                })
            }
        });

    } catch (e) {
        console.error(e);
        throw new Error('Could not convert to jpg');
    }
}

module.exports = {
    download, compress, convertPngToJpg
}
