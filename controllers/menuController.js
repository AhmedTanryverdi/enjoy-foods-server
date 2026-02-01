const menuService = require('../services/menuService');

const getHomeMenu = async (req, res)=>{
    try{
        const dishes = await menuService.getMenu(5);
        res.json(dishes);
    }catch (e) {
        res.status(500).json({message: 'server error'});
    }
}

module.exports = {getHomeMenu };