const Sequelize = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'databaseMusica.sqlite'
});

sequelize.authenticate()
    .then(()=> {
        console.log("La conexion con la base de datos establecida");
    })
    .error((error) => {
        console.error(error);
    });

const album = require("./models/album")(sequelize);
const artist = require("./models/artist")(sequelize);
const customer = require("./models/customer")(sequelize);
const employee = require("./models/employee")(sequelize);
const genre = require("./models/genre")(sequelize);
const invoice_item = require("./models/invoice_item")(sequelize);
const invoice = require("./models/invoice")(sequelize);
const media_type = require("./models/media_type")(sequelize);
const playlist = require("./models/playlist")(sequelize);
const track = require("./models/track")(sequelize);

//Llaves foraneas
artist.hasMany(album, {foreignKey: 'ArtistId', as: "Album"})
employee.hasMany(customer, {foreignKey: 'SupportRepId', as: "Customer"})
employee.hasMany(employee, {foreignKey: 'ReportsTo', as: "Employee"})
invoice.hasMany(invoice_item, {foreignKey: 'InvoiceId', as: "Invoice_item"})
track.hasMany(invoice_item, {foreignKey: 'TrackId', as: "Invoice_item"})
customer.hasMany(invoice, {foreignKey: 'CustomerId', as: "Invoice"})
playlist.belongsToMany(track, {foreignKey: 'PlayListId', through: "playlist_track"})
track.belongsToMany(playlist, {foreignKey: 'TrackId', through: "playlist_track"})
media_type.hasMany(track, {foreignKey: 'MediaTypeId', as: "Track"})
album.hasMany(track,{foreignKey:'AlbumId', as:"Track"})
genre.hasMany(track, {foreignKey: 'GenreId', as: "Track"})

//Pop

sequelize.sync();

module.exports = {
    sequelize,
    album,
    artist,
    customer,
    employee,
    genre,
    invoice_item,
    invoice,
    media_type,
    playlist,
    track
}