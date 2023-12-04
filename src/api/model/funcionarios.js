module.exports = (sequelize, Sequelize) => {
    const funcionarios = sequelize.define('funcionarios', {
        codigo:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nome:{
            type: Sequelize.STRING,
            allowNull: false
        },
        cpf:{
            type: Sequelize.STRING,
            allowNull: false
        },
        senha:{
            type: Sequelize.STRING,
            allowNull: false
        },
        funcao:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return funcionarios;
}
