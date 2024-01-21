const path = require("path")
const knex = require("knex")

const crypto = require("crypto");
const fs = require("fs");
const DiskStorage = require("../src/providers/DiskStorage");

const config = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: path.resolve("src", "database", "database.db")
        },

        pool: {
            afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
        },
        useNullAsDefault: true
    },
};

const database = knex(config.development);

const plates = [
    {
        title: 'Salada Ravanello',
        price: 49.97,
        description: 'Monica',
        category: 'refeicoes',
        ingredients: ['cebola', 'batata', 'tomate', 'alho', 'oregano', 'sal'],
        image: 'db/image1.png'
    },
    {
        title: 'Spaguetti Gambe',
        price: 79.97,
        description: 'Monica',
        category: 'refeicoes',
        ingredients: ['cebola', 'batata', 'tomate', 'alho', 'oregano', 'sal'],
        image: 'db/image1.png'
    },
    {
        title: 'Torradas de Parma',
        price: 25.97,
        description: 'Monica',
        category: 'refeicoes',
        ingredients: ['cebola', 'batata', 'tomate', 'alho', 'oregano', 'sal'],
        image: 'db/image1.png'
    },
    {
        title: 'Prugna Pie',
        price: 79.97,
        description: 'Monica',
        category: 'sobremesas',
        ingredients: ['cebola', 'batata', 'tomate', 'alho', 'oregano', 'sal'],
        image: 'db/image1.png'
    },
    {
        title: 'Peachy Pastrie',
        price: 32.97,
        description: 'Monica',
        category: 'sobremesas',
        ingredients: ['cebola', 'batata', 'tomate', 'alho', 'oregano', 'sal'],
        image: 'db/image1.png'
    },
    {
        title: 'Macarons',
        price: 79.97,
        description: 'Monica',
        category: 'sobremesas',
        ingredients: ['cebola', 'batata', 'tomate', 'alho', 'oregano', 'sal'],
        image: 'db/image1.png'
    },
    {
        title: 'Espresso',
        price: 15.97,
        description: 'Oie',
        category: 'bebidas',
        ingredients: ['cebola', 'batata', 'tomate', 'alho', 'oregano', 'sal'],
        image: 'db/image1.png'
    },
    {
        title: 'Suco de Maracujá',
        price: 13.97,
        description: 'Oie',
        category: 'bebidas',
        ingredients: ['cebola', 'batata', 'tomate', 'alho', 'oregano', 'sal'],
        image: 'db/image1.png'
    },
    {
        title: 'Tè d autunno',
        price: 19.97,
        description: 'Oie',
        category: 'bebidas',
        ingredients: ['cebola', 'batata', 'tomate', 'alho', 'oregano', 'sal'],
        image: 'db/image1.png'
    }
]

plates.map(plate => {
    (async function () {
        
        const fileHash = crypto.randomBytes(10).toString("hex");
        const fileName = `${fileHash}-${path.basename(plate.image)}`;

        let [plate_id] = await database("plates").insert({
            title: plate.title,
            description: plate.description,
            category: plate.category,
            price: plate.price,
            image: fileName
        });

        let ingredientsInsert = plate.ingredients.map(name => {
            return {
                plate_id,
                name,
                
            }
        });

        console.log(ingredientsInsert)
        await database("ingredients").insert(ingredientsInsert);



        await fs.copyFile(plate.image, `./tmp/${fileName}`, (error) => {
            if (error) {
                console.log("Error Found:", error);
            }
            else {
                diskStorage = new DiskStorage();
                diskStorage.saveFile(fileName);
            }
        }
        )
        console.log('Tudo criado')
    })()

});



