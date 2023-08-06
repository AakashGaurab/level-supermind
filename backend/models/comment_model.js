module.exports = (sequelize,DataTypes)=>{
    const comments = sequelize.define("comments",{
       
       userid:{type:DataTypes.INTEGER,refrence:{model:'users',key:'id'}},
       blogid:{type:DataTypes.INTEGER,refrence:{model:'blogs',key:'id'}},
       content:{type:DataTypes.STRING}

    })

    return comments;
}