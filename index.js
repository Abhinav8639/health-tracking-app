const express=require('express');

const app=express();

const mongoose=require('mongoose');
const Chat=require('./models/chat.js');
const methodOverride=require("method-override");

const path=require('path');
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


main()  
.then(()=>{
    console.log("connection sucess");
})

.catch(err=> console.log(err));
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/watsapp')

}
//index route 
app.get("/chats",async(req,res)=>{
    let chats=await Chat.find();
    console.log(chats);
    res.render("index.ejs",{chats});

    });
app.get("/",(req,res)=>{
    res.redirect("/chats");
});
//new route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});


app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
});


//create route
app.post("/chats",(req,res)=>{
    let{Date,temperature,bp,bpm}=req.body;
    let newChat=new Chat({
        Date:Date,
        temperature:temperature,
        bp:bp,
        bpm:bpm,

    });
    newChat.save()
    .then((res)=>{
        console.log("chat was saved");
    })
    .catch((err)=>{
        console.log(err);
    });
    res.redirect("/chats");
});

//ubdate route

app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { Date, temperature, bp, bpm } = req.body; // Adjusted to match the input names
    try {
        let updatedChat = await Chat.findByIdAndUpdate(id, { Date, temperature, bp, bpm }, { runValidators: true, new: true });
        console.log(updatedChat);
        res.redirect("/chats");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});


app.delete("/chats/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedChat = await Chat.findByIdAndDelete(id);
        console.log(deletedChat);
        res.redirect("/chats");
    } catch (error) {
        console.error("Error deleting chat:", error);
        res.status(500).send("Internal Server Error");
    }
});








app.listen(8080,()=>{
    console.log("server is listining on port 8080");

});