const express = require('express');
const router = express.Router();
const downloader = require('../app/services/file.service');
const rimraf = require('rimraf');
const archiver = require('archiver');
const multer = require('multer');
const upload = multer({ dest: 'storage/multer' });

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/download', async (req, res, next) => {
  const {url, number} = req.body;
  try {
    const folderName = await downloader.download(url, number);
    const folderPath =  __basedir + '/storage/temp/' + folderName;
    const archive = archiver('zip', { zlib: { level: 9 }});
    archive.directory(folderPath, false);
    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename="' + folderName + '.zip' + '"'
    });
    res.on('finish', function () {
      console.log('Finished sending coverage data.');
      rimraf(folderPath, () => {});
    });
    archive.pipe(res);
    archive.finalize();
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500) && next(e);
  }
});

router.post('/compress', upload.single('images'), async (req, res, next) => {
  try {
    const name = uuid();
    // Store zip file into `temp` folder:
    const file = req.file;
    const tempFolderPath = __basedir + '/storage/temp/';
    const imagesPath =  tempFolderPath + name;

    // Unzip to imagesPath


    const archive = archiver('zip', { zlib: { level: 9 }});
    archive.directory(imagesPath, false);
    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename="' + folderName + '.zip' + '"'
    });
    res.on('finish', function () {
      console.log('Finished sending coverage data.');
      rimraf(folderPath, () => {});
    });
    archive.pipe(res);
    archive.finalize();
  } catch (e) {
    console.error(e.message);
    res.sendStatus(500) && next(e);
  }
});



module.exports = router;

