const express = require('express');
const router = express.Router();
const fileHelper = require('../app/services/file.service');
const rimraf = require('rimraf');
const archiver = require('archiver');
const multer = require('multer');
const upload = multer({ dest: 'storage/multer' });
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const unzipper = require('unzipper');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/download', async (req, res, next) => {
  const {url, number, prefix} = req.body;
  try {
    const folderName = await fileHelper.download(url, number, prefix);
    const folderPath =  __basedir + '/storage/temp/' + folderName;
    const archive = archiver('zip', { zlib: { level: 9 }});
    archive.directory(folderPath, false);
    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename="' + folderName + '.zip' + '"'
    });
    res.on('finish', function () {
      console.log('Finished sending coverage data.');
      setTimeout(() => {
        rimraf(folderPath, () => {});
      }, 20000);
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
    const folderName = uuidv4();
    // Store zip file into `temp` folder:
    const tempFolderPath = __basedir + '/storage/temp/';
    const imagesPath =  tempFolderPath + folderName;
    const desPath =  imagesPath + '/' + 'compressed';

    // Unzip to imagesPath
    const r = await fs.createReadStream(req.file.path)
        .pipe(unzipper.Extract({ path: imagesPath }))
        .on('entry', entry => entry.autodrain())
        .promise();

    // Compress images
    await fileHelper.compress(imagesPath, desPath);

    const archive = archiver('zip', { zlib: { level: 9 }});
    archive.directory(desPath, false);
    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename="' + folderName + '.zip' + '"'
    });
    res.on('finish', function () {
      console.log('Finished sending coverage data.');
      rimraf(imagesPath, () => {});
    });
    archive.pipe(res);
    archive.finalize();
  } catch (e) {
    console.error(e.message);
    res.sendStatus(500) && next(e);
  }
});



module.exports = router;

