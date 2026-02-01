const {sql} = require('../config/database');

class DishModel{
    static async getAll(limit=5){
        const query = `
            SELECT TOP ${limit}
                name, price, image_url,status
            FROM menu;
        `;
        const result = await sql.query(query);

        return result.recordset;
    }
}

module.exports = DishModel;