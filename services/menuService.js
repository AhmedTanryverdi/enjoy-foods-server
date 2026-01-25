const DishModel = require('../models/dish');

const getMenu = async (limit=5)=>{
    return DishModel.getAll(limit);
};

module.exports = {getMenu}