const db = require('../models/database.js');

const getAnimnales = async (req, res) => {
    try {
        const animales = await db.query("SELECT * FROM animals")
        const animals = animales.rows
        res.status(200).json({animals})
    } catch (error) {
        console.log(error);
    }
}

const postAnimales = async (req, res) => {
    const {name, species ,age , weight ,habitat } = req.body
    try {
        const post = await db.query('INSERT INTO animals  (name, species ,age , weight ,habitat ) VALUES ($1, $2, $3 , $4 , $5)', [name, species ,age , weight ,habitat])
        res.status(200).json({message:"information added succesfully", data:{name:name, species:species , age:age , weight:weight , habitat: habitat}})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"error occureing" + error})
    }
}

const updateInformation = async (req, res) => {
    const {name, species ,age , weight ,habitat } = req.body
    const {id} = req.params
    try {
        const updateInfo = await db.query("UPDATE animals  SET name = $1, species = $2, age = $3 , weight = $4 , habitat = $5 WHERE id = $6", [name, species ,age , weight ,habitat, id])
        res.status(200).json({message:"updated succesfully", data:{name:name, species:species , age:age , weight:weight , habitat: habitat}})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"error occure while update inforations" + error})
    }
}


const deleteAnimale = async (req, res) => {
    const {id} = req.params
    try {
        const deletAnimale = await db.query("DELETE FROM animals  WHERE id = $1", [id])
        res.status(200).json({message:"deleted succesfully", data:{deletAnimale}})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"error occured while delete information" + error})
    }
}



module.exports ={
    getAnimnales,
    postAnimales, 
    updateInformation, 
    deleteAnimale
}