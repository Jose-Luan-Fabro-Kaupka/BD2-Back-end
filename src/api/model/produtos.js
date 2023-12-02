module.exports = (sequelize, Sequelize) => {
    const produtos = sequelize.define('produtos', {
        codigo:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        descricao:{
            type: Sequelize.STRING,
            allowNull: false
        },
        valor:{
            type: Sequelize.NUMERIC,
            allowNull: false
        },
        quantidade:{
            type: Sequelize.NUMERIC,
            allowNull: false
        }
    });
    return produtos;
}