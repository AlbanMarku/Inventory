const path = require('path');
const multer = require('multer');
const uniqid = require('uniqid');
const Item = require('./models/item');
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
        name: 'theName',
        imageLink: imageUrl,
        id: uniqid('image-'),
      });
      try {
        const savedResp = await item.save();
        res.json({ message: savedResp });
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  });

  app.get('/api/fetchAll', async (req, res) => {
    const items = await Item.find({});
    res.json(items);
  });

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
  });
};

module.exports = {
  endpoint,
};
