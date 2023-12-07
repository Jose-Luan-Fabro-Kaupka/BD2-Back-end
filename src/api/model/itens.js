module.exports = (sequelize, Sequelize) => {
    const itens = sequelize.define('itens', {
        codigo:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        quantidade:{
            type: Sequelize.NUMERIC,
            allowNull: false
        },
        valor_parcial:{
            type: Sequelize.NUMERIC,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return itens;
}