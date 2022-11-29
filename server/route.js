const path = require('path');
const multer = require('multer');
const uniqid = require('uniqid');
const bcrypt = require('bcrypt');
const Item = require('./models/item');
const User = require('./models/User');
const fireApp = require('./firebase.config');

// Use multer memory storage.
const storage = multer.memoryStorage();

const endpoint = (app) => {
  const upload = multer({ storage });

  app.get('/api', (req, res) => {
    res.json({ message: '👋 from Express!' });
  });

  app.post('/api/upload', upload.single('image'), async (req, res) => {
    // Location reference for fire storage online location.
    const imageRef = fireApp.storage.ref(
      fireApp.fireStorage,
      `imgs/${req.file.originalname}/`
    );
    try {
      // Send image from memory buffer to fire storage.
      await fireApp.storage.uploadBytesResumable(imageRef, req.file.buffer);
      // Get the url of image that was just sent.
      const imageUrl = await fireApp.storage.getDownloadURL(imageRef);

      // Create a new Item entry, includes image url.
      const item = new Item({
        name: req.body.name,
        imageLink: imageUrl,
        filename: req.file.originalname,
        id: uniqid('image-'),
      });

      await item.save();
      res.json({ message: 'Done uploading.' });
    } catch (err) {
      console.log(err);
    }
  });

  app.post('/api/update', upload.single('image'), async (req, res) => {
    try {
      const imageRef = fireApp.storage.ref(
        fireApp.fireStorage,
        `imgs/${req.file.originalname}/`
      );
      await fireApp.storage.uploadBytesResumable(imageRef, req.file.buffer);
      const imageUrl = await fireApp.storage.getDownloadURL(imageRef);

      const item = await Item.find({ name: req.body.name });
      if (item[0]) {
        const imageToDelete = fireApp.storage.ref(
          fireApp.fireStorage,
          `imgs/${item[0].filename}`
        );
        await fireApp.storage.deleteObject(imageToDelete);

        Item.findOneAndUpdate(
          { name: req.body.name },
          {
            name: req.body.newName,
            imageLink: imageUrl,
            filename: req.file.originalname,
          },
          (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log('updated item');
              res.json('done');
            }
          }
        );
      } else {
        console.log('There is no item to update.');
        res.json('there is no item to update');
      }
    } catch (err) {
      console.log(err);
    }
  });

  app.get('/api/search', async (req, res) => {
    const nameToFind = req.query.name;
    const items = await Item.find({ name: nameToFind });
    res.json(items);
  });

  app.get('/api/delete', async (req, res) => {
    const nameToDelete = req.query.name;
    const item = await Item.find({ name: nameToDelete });

    const imageRef = fireApp.storage.ref(
      fireApp.fireStorage,
      `imgs/${item[0].filename}`
    );

    try {
      const fireDel = await fireApp.storage.deleteObject(imageRef);
      await Item.deleteOne({ name: nameToDelete });
      console.log(fireDel);
    } catch (err) {
      console.log(err);
    }

    res.json('done');
  });

  app.get('/api/fetchAll', async (req, res) => {
    const items = await Item.find({});
    console.log(items);
    res.json(items);
  });

  app.post('/api/createUser', async (req, res) => {
    try {
      const sampleName = 'alban';
      const samplePwd = 'alban4321';
      const hashedPwd = await bcrypt.hash(samplePwd, 10);
      const user = new User({
        name: sampleName,
        pwd: hashedPwd,
      });
      await user.save();
      res.json('User created');
    } catch (err) {
      console.log(err);
    }
  });

  app.post('/api/login', async (req, res) => {
    const sampleName = 'alban';
    const samplePwd = 'alban4321';
    try {
      const user = await User.findOne({ name: sampleName });
      if (user) {
        if (await bcrypt.compare(samplePwd, user.pwd)) {
          res.send('login done');
        } else {
          res.send('failed login');
        }
      } else {
        res.json('not found');
      }
    } catch (error) {
      console.log(error);
    }
  });

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
  });
};

module.exports = {
  endpoint,
};
