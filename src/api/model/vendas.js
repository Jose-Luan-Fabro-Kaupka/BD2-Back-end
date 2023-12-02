module.exports = (sequelize, Sequelize) => {
    const vendas = sequelize.define('vendas', {
        codigo:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        horario:{
            type: Sequelize.DATE,
            allowNull: false
        },
        valor_total:{
            type: Sequelize.NUMERIC,
            allowNull: false
        }
    });
    return vendas;
}
