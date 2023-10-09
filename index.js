const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8l4usvv.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri);
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const database = client.db("blog_wave");
    const users = database.collection("users");
    const blogs = database.collection("blogs");

    //Post all users

    app.post("/users", async (req, res) => {
      const user = req.body;
      const uid = user.uid;
      //finding if the user with same email exist in db
      const existingUser = await users.findOne({ uid: uid });
      if (existingUser) {
        return res.status(409).send("User already exist in database!");
      } 
      else {
        const result = await users.insertOne(user);
        console.log(result);
        res.send(result);
      }
    });

    //edit a user's profile

    app.put('/users/:userId', async(req,res) =>{
      const userId = req.params.userId;
      const content = req.body;
      const filter = {uid:userId};
      const options = { upsert: true };
      const updateDoc = { $set: {} };
      if (content.photoURL) {
        updateDoc.$set.profilePic = content.photoURL;
      }

      if (content.displayName) {
        updateDoc.$set.name = content.displayName;
      }
      if (content.about) {
        updateDoc.$set.about = content.about 
      }
      
      const result = await users.updateOne(filter,updateDoc,options);
      res.send(result)
    })

    //get a user's Details
    app.get('/users/:userUid', async (req,res) =>{
      const userUid = req.params.userUid;
      const query = {uid:userUid};
      const result = await users.findOne(query);
      res.send(result)
    })
    //post all blogs

    app.post('/blogs', async (req,res) =>{
      const post = req.body;
      const result = await blogs.insertOne(post);
      res.send(result)

    })

    //get all blogs

    app.get("/blogs", async(req,res) =>{
      const query = {};
      const posts = await blogs.find(query).toArray();
      res.send(posts) 
    })

    //get a blog for details

    app.get('/blogs/:blogId', async (req,res) =>{
      const _id = req.params.blogId;
      const query = {_id : new ObjectId(_id)};
      const blog = await blogs.findOne(query);
      res.send(blog);
    })

   //get only a user's blog
   app.get('/blogs/myBlogs/:uid',async(req,res) =>{
    const uid = req.params.uid;
    console.log(uid);
    const query = {userUid:uid}
    const result = await blogs.find(query).toArray();
    res.send(result)
   })

  } catch (error) {}
}
run().catch(console.log);

app.get("/", (req, res) => {
  res.send("Blog Wave Server is running");
});

app.listen(port, () => {
  console.log("blog wave server is running on port", port);
});
