module.exports = (sequelize, Sequelize) => {
    const fornecedores = sequelize.define( 'fornecedores', {
        codigo: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return fornecedores;
}