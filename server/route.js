const path = require('path');
const multer = require("multer");
const Item = require("./models/item");

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, "./imgs");
    },
    filename: function(req,file,cb) {
        cb(null, file.originalname);
    }
});

const endpoint = app => {

    const upload = multer({storage: storage});

    app.get("/api", (req, res) => {
        res.json({ message: '👋 from Express!' });
    });
    
    app.post("/api/upload", upload.single("image"), (req, res) => {
        const item = new Item({
            name: "theName",
            imageLink: req.file.path
        });

        item.save()
        .then((result) => {
            res.send(result);
            console.log("Saved item");
        })
        .catch((err) => console.log(err));
    });

    app.get("/api/fetchAll", async (req,res) => {
        const items = await Item.find({});
        console.log(items);
        res.json(items);
    });

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
    });
};

module.exports = {
    endpoint
}