// SEED THE DB
import {
    product,
    productImage,
    productType,
    productTag,
    productToProductTag,
    user,
    session,
    emailList
} from './schema';

//import {db} from './index';
import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import pg from 'pg';

dotenv.config()
const { Pool } = pg;

    //connect to db
    const pool = new Pool({ connectionString: process.env.DATABASE_CONNECTION_STRING });
    const db = drizzle(pool, { schema });
    //export default pool

    const clearData = async () => {
        try {
          await db.delete(productToProductTag);
          await db.delete(productTag);
          await db.delete(productImage);
          await db.delete(productType);
          await db.delete(product);
          console.log("Cleared existing data");
        } catch (error) {
          console.error("Error clearing data:", error);
        }
      };
    
const seed = async () => {

      // Clear existing data
  await clearData();

    console.log("seeding db...")
    //console.log(db)

    // create some products
    const products = [
        {
            name: 'Ugreen PowerRoam 1200W 1024Wh LiFePO4 Battery Backup Solar Generator',
            desc: '1200W AC Output, up to 2500W w/ U-Turbo50 Minutes 0 to 80% Battery13 Ports for Any Power NeedEasy App Control5-Year Full-Device Warranty',
            // can be whatever
            id: 'Ugreen_PowerRoam_1200W',

        },
        {
            name: 'Ugreen 6-in-1 4K HDMI USB C Hub',
            desc: 'UGREEN Premium 6-in-1 USB C Hub Conveniently adds more connections to your laptop, easily switch between your devices. Mirror or extend your screen with USB C to USB adapters HDMI port and directly stream 4K@30Hz UHD or full HD 1080P video to HDTV.',
            id: 'Ugreen-6-in-1-4K-USB-C-Hub',

        }
    ];

    const insertedProducts = (await db.insert(product).values(products)).rows;

    console.log(`INSERTED: ${insertedProducts.length} products`);

    // create some product sizes
    // TODO STRIPE:
    // replace the stripeProductId and stripePriceId which you get from the dashboard
    const productTypes = [
        {
            code: 'first_12_12',
            price: 99900,
            productId: 'Ugreen_PowerRoam_1200W'
        },

        {
            code: 'second_12_12',
            price: 1749,
            productId: 'Ugreen-6-in-1-4K-USB-C-Hub'
        },
 
    ];

    const insertedproductTypes = (await db.insert(productType).values(productTypes)).rows;

    console.log(`INSERTED: ${insertedproductTypes.length} product sizes`);

    // create some product images
    // TODO CLOUDINARY: update the cloudinaryIds with your own cloudinary ids
    const images = [
        {
            cloudinaryId: 'zhmgawwsktqqnwr0upwb',
            width: 1920,
            height: 1280,
            productId: 'Ugreen_PowerRoam_1200W'
        },
        {
            cloudinaryId: 'pqlryc6t5xcx06kcgowy',
            width: 1920,
            height: 1280,
            productId: 'Ugreen-6-in-1-4K-USB-C-Hub'
        },
        {
            cloudinaryId: 'ikbbfslp5lkzzwzghd2h',
            width: 1920,
            height: 1280,
            productId: 'Ugreen_PowerRoam_1200W'
        },
        {
            cloudinaryId: 'q16zs3p7yrsrq1rt2i1m',
            width: 1920,
            height: 1280,
            productId: 'Ugreen-6-in-1-4K-USB-C-Hub'
        }
    ];

    const insertedImages = (await db.insert(productImage).values(images)).rows;

    console.log(`INSERTED: ${insertedImages.length} product images`);

    // create some product tags
    const productTags = [
        {
            name: 'Power-Station',
            desc: 'Portable Power Supplies...'
        },
        {
            name: 'Hubs',
            desc: 'Connections to devices'
        }
    ];

    const insertedTags = (await db.insert(productTag).values(productTags)).rows;

    console.log(`INSERTED ${insertedTags.length} product tags`);

    // attach tags to products
    const productsToTags = [
        {
            productId: 'Ugreen_PowerRoam_1200W',
            tagId: 'Power-Station'
        },
        {
            productId: 'Ugreen-6-in-1-4K-USB-C-Hub',
            tagId: 'Hubs'
        }
    ];

    const insertedTagsToProducts = (await db.insert(productToProductTag).values(productsToTags)).rows;

    console.log(`INSERTED ${insertedTagsToProducts.length} product tag relations`);

    console.log("...completed seeding")

};


const insertUser = async () => {
    const users = [
        {
            id: "8p43k3vnymmfn13kwepxpgfk5hdjvdr5t1ijks8l",
            provider: "github",
            providerId: "81527773",
            firstName: "Gidi",
            lastName: "Guru",
            isAdmin: true,
            email: "gidiguru@gmail.com",
            stripeCustomerId: "81527773",
        },

    ];

    try {
        const insertedUsers = await db.insert(user).values(users);
        console.log('Users inserted successfully:', insertedUsers);
        return insertedUsers;
    } catch (error) {
        console.error('Error inserting users:', error);
        throw error;
    }
};



const drop = async () => {
    await db.delete(product)
    await db.delete(productType)
    await db.delete(productImage)
    await db.delete(productTag)
    await db.delete(productToProductTag)
    console.log("deleted everything")
}


const deleteUser = async () => {
    await db.delete(user)
    console.log("deleted user")
}

const deleteSession = async () => {
    await db.delete(session)
    console.log("deleted session")
}

const deleteEmailList = async () => {
    await db.delete(emailList)
    console.log("deleted email list")
}


seed()
//drop()
//insertUser()
//deleteUser();
//deleteEmailList();
//deleteSession();


