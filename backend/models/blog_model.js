module.exports = (sequelize,DataTypes)=>{
    const blogs = sequelize.define("blogs",{
       
       userid:{type:DataTypes.INTEGER,refrence:{model:'users',key:'id'}},
       title:{type:DataTypes.STRING,allowNull:false},
       content:{type:DataTypes.TEXT('long'),allowNull:false}

    })

    return blogs;
}