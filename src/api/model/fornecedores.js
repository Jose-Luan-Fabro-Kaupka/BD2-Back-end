module.exports = (sequelize, Sequelize) => {
    const fornecedores = sequelize.define( 'fornecedores', {
        codigo: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        descricao: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return fornecedores;
}