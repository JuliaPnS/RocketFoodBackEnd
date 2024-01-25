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
        description: 'Rabanetes, folhas verdes e molho agridoce salpicados com gergelim',
        category: 'refeicoes',
        ingredients: ['alface', 'cebola', 'pão naan', 'pepino', 'rabanete', 'tomate'],
        image: 'db/image1.png'
    },
    {
        title: 'Spaguetti Gambe',
        price: 79.97,
        description: 'Massa fresca com camarões e pesto',
        category: 'refeicoes',
        ingredients: ['cebola', 'alho','sal', 'camarão', 'molho pesto', 'orégano'],
        image: 'db/image2.png'
    },
    {
        title: 'Torradas de Parma',
        price: 25.97,
        description: 'Presunto de parma e rúcula em um pão com fermentação natural',
        category: 'refeicoes',
        ingredients: ['pão caseiro', 'presunto parma', 'rúcula'],
        image: 'db/image3.png'
    },
    {
        title: 'Prugna Pie',
        price: 79.97,
        description: 'Torta de ameixa com massa amanteigada, polvilho em açuçar',
        category: 'sobremesas',
        ingredients: ['ameixa', 'polvilho', 'açúcar', 'massa amanteigada'],
        image: 'db/image6.png'
    },
    {
        title: 'Peachy Pastrie',
        price: 32.97,
        description: 'Delicioso folheado de pêssego com folhas de hortelã',
        category: 'sobremesas',
        ingredients: ['massa folheada', 'pêssego', 'tomate cereja', 'hortelã'],
        image: 'db/image5.png'
    },
    {
        title: 'Macarons',
        price: 79.97,
        description: 'Farinhas de amêndoas, manteiga, claras e açúcar',
        category: 'sobremesas',
        ingredients: ['manteiga', 'amêndoas', 'claras', 'açúcar'],
        image: 'db/image4.png'
    },
    {
        title: 'Espresso',
        price: 15.97,
        description: 'Café cremoso feito na temperatura e pressões perfeitas',
        category: 'bebidas',
        ingredients: ['café'],
        image: 'db/image7.png'
    },
    {
        title: 'Suco de Maracujá',
        price: 13.97,
        description: 'Suco de maracujá gelado, cremoso e docinho',
        category: 'bebidas',
        ingredients: ['maracujá', 'gelo', 'açúcar'],
        image: 'db/image8.png'
    },
    {
        title: 'Tè d autunno',
        price: 19.97,
        description: 'Chá de anis, canela e limão. Sinta o outono italiano',
        category: 'bebidas',
        ingredients: ['Limão', 'anis', 'canela'],
        image: 'db/image9.png'
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



