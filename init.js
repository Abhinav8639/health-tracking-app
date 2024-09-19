const mongoose=require('mongoose');
const Chat=require('./models/chat.js');

main()  
.then(()=>{
    console.log("connection sucess");
})

.catch(err=> console.log(err));
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/watsapp')

}



let chat1=new Chat({
    from:"neha",
    to:"priya",
    msg:"send me your exam sheets",
    created_at:new Date(),
});

chat1.save().then((res)=>{
    console.log(res);
});
