var express = require('express');
var router = express.Router();
const body= require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todo");
/* GET home page. */

const schema= mongoose.Schema({input:String});
const model = mongoose.model("collection", schema);

const item = new model({input:"Study"});
//item.save();

router.get('/', function(req, res, next) {
  model.find({}).then((todo)=>{
    res.render("index",{data:todo});
}).catch((err)=>{
    console.log(err);
})
})
router.post("/",(req,res)=>{
  const name= req.body.name;
  // model.insertOne({input:name})
  const update= new model({input:name});
  update.save();

  // res.render("index", {data:name});
  // item.push(name);
  // console.log(name);
  res.redirect("/");
});

  router.post("/delete",(req,res)=>{
    const dlt=req.body.check;
    model.findOneAndDelete(dlt).then((prmse)=>{
      console.log("deleted")
    }).catch((err)=>{
      console.log(err);
    })
    // delet.save();
    res.redirect("/");
    });
  


//   res.render('index', { title: 'Express' });
// });
router.use(express.urlencoded({ extended: true }));
module.exports = router;
