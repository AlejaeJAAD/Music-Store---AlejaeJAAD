const express = require("express")

const app = express()

const cors = require('cors')

app.use(cors()) // Use this after the variable declaration

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const models = require('./configure-db');

//Routes
const album = require("./routes/album")(models);
const artist = require("./routes/artist")(models);
const customer = require("./routes/customer")(models);
const employee = require("./routes/employee")(models);
const genre = require("./routes/genre")(models);
const invoice_item = require("./routes/invoice_item")(models);
const invoice = require("./routes/invoice")(models);
const media_type = require("./routes/media_type")(models);
const playlist = require("./routes/playlist")(models);
const playlist_track = require("./routes/playlist_track")(models);
const track = require("./routes/track")(models);

//Use
app.use("/api/Album", album);
app.use("/api/Artist", artist);
app.use("/api/Customer", customer);
app.use("/api/Employee", employee);
app.use("/api/Genre", genre);
app.use("/api/InvoiceItem", invoice_item);
app.use("/api/Invoice", invoice);
app.use("/api/MediaType", media_type);
app.use("/api/Playlist", playlist);
app.use("/api/PlaylistTrack", playlist_track);
app.use("/api/Track", track);

const port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log(`El servidor esta ejecutandose en el puerto ${port}`);
});