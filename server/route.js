const path = require('path');
const multer = require('multer');
const uniqid = require('uniqid');
const bcrypt = require('bcrypt');
const Item = require('./models/Item');
const User = require('./models/User');
const fireApp = require('./firebase.config');

// Use multer memory storage.
const storage = multer.memoryStorage();

const endpoint = (app) => {
  const upload = multer({ storage });

  app.post('/api/upload', upload.single('image'), async (req, res) => {
    try {
      const randomString = uniqid('image-');
      // Location reference for fire storage online location.
      const imageRef = fireApp.storage.ref(
        fireApp.fireStorage,
        `imgs/${`${randomString}_${req.file.originalname}`}/`
      );
      // Send image from memory buffer to fire storage.
      await fireApp.storage.uploadBytesResumable(imageRef, req.file.buffer);
      // Get the url of image that was just sent.
      const imageUrl = await fireApp.storage.getDownloadURL(imageRef);

      // Create a new Item entry, includes image url.
      const item = new Item({
        name: req.body.name,
        imageLink: imageUrl,
        filename: `${randomString}_${req.file.originalname}`,
        id: randomString,
      });

      await item.save();
      res.json({ message: 'Done uploading.' });
      console.log(imageRef);
      console.log(item.filename);
    } catch (err) {
      console.log(err);
      res.json({ message: 'Something went wrong.' });
    }
  });

  app.post('/api/update', upload.single('image'), async (req, res) => {
    try {
      // Find item in db.
      const item = await Item.find({ name: req.body.name });
      // If there is an item, upload new image.
      if (item[0]) {
        const imageRef = fireApp.storage.ref(
          fireApp.fireStorage,
          `imgs/${req.file.originalname}/`
        );

        await fireApp.storage.uploadBytesResumable(imageRef, req.file.buffer);
        const imageUrl = await fireApp.storage.getDownloadURL(imageRef);

        // Delete old image.
        const imageToDelete = fireApp.storage.ref(
          fireApp.fireStorage,
          `imgs/${item[0].filename}`
        );
        await fireApp.storage.deleteObject(imageToDelete);
        // Update values of item with new image url.
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
              res.json({ message: 'Something went wrong.' });
            } else {
              res.json({ message: 'Update item!' });
            }
          }
        );
      } else {
        res.json("Item doesn't exist.");
      }
    } catch (err) {
      console.log(err);
      res.json({ message: 'Something went wrong.' });
    }
  });

  app.get('/api/search', async (req, res) => {
    // Find item in db.
    const nameToFind = req.query.name;
    try {
      const items = await Item.find({ name: nameToFind });
      res.json(items);
    } catch (err) {
      console.log(err);
      res.json({ message: 'Something went wrong.' });
    }
  });

  app.get('/api/delete', async (req, res) => {
    // Find item in db.
    const nameToDelete = req.query.name;
    const item = await Item.find({ name: nameToDelete });

    // If found, find image in storage.
    if (item[0]) {
      const imageRef = fireApp.storage.ref(
        fireApp.fireStorage,
        `imgs/${item[0].filename}`
      );

      try {
        // Delete image in storage and item in db.
        const fireDel = await fireApp.storage.deleteObject(imageRef);
        await Item.deleteOne({ name: nameToDelete });
        console.log(fireDel);
        res.json({ message: 'Deleted.' });
      } catch (err) {
        console.log(err);
        res.json({ message: 'Something went wrong.' });
      }
    } else {
      res.json({ message: "Item doesn't exist." });
    }
  });

  app.get('/api/fetchAll', async (req, res) => {
    // Find all items.
    try {
      const items = await Item.find({});
      res.json(items);
    } catch (err) {
      console.log(err);
      res.json({ message: 'Something went wrong.' });
    }
  });

  app.post('/api/createUser', async (req, res) => {
    // Encrypt provided password and then create a new user.
    try {
      const sampleName = 'alban';
      const samplePwd = 'alban4321';
      const hashedPwd = await bcrypt.hash(samplePwd, 10);
      const user = new User({
        name: sampleName,
        pwd: hashedPwd,
      });
      await user.save();
      res.json({ message: 'User created' });
    } catch (err) {
      console.log(err);
      res.json({ message: 'Something went wrong.' });
    }
  });

  app.post('/api/login', upload.none(), async (req, res) => {
    // Find username then check if password matches with db pwd to provided pwd.
    const { sampleName } = req.body;
    const { samplePwd } = req.body;
    try {
      const user = await User.findOne({ name: sampleName });
      if (user) {
        if (await bcrypt.compare(samplePwd, user.pwd)) {
          res.json({ message: 'Logged in.', username: sampleName });
        } else {
          res.json({ message: 'Incorrect username or password' });
        }
      } else {
        res.json({ message: 'No user' });
      }
    } catch (err) {
      console.log(err);
      res.json({ message: 'Something went wrong.' });
    }
  });

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
  });
};

module.exports = {
  endpoint,
};
