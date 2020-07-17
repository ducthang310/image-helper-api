const downloader = require('../app/services/file.service');
const categories = ['arch', 'animals', 'tech'];
categories.map((cat, i) => {
    downloader.download(
        'https://placeimg.com/1440/720/' + cat,
        './storage/sample-images/general',
        cat
    )
});
