const router = require("express").Router();
const admin = require("firebase-admin");
const db = require("./firebase");
const { collection, query, onSnapshot } = require("firebase/firestore");
const Token = [];
const d = [];

const GetData = async () => {
  const q = await query(collection(db, "Tokens"));
  await onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      Token.push({ ...doc.data() });
    });

    for (i in Token) {
      d.push(Token[i].token);
    }
  });
};
GetData();

var serviceAccount = require("./cryptosingalapplication-firebase-adminsdk-clz0n-81a5853d02.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

router.get("/", (req, res) => {
  res.status(200).json({ msg: "Server up" });
});
router.post("/notification", async (req, res) => {
  // console.log(d);
  // const message = {
  //   notification: {
  //     title: `COIN`,
  //     body: `CHECK OUT THIS SIGNAL`,
  //   },
  //   token:
  //     "eBYnxlI6Wkfap8erh_CeBe:APA91bE7kDGolyTTJXjZjuZSRFixbN_cj-QqGNf4YkS5CHUftB2oyenhLTYOuAtt7nCx1P52Uo5qjT_gG8KrPsDELVrF8JfixIRTXq2qSly4eg_AHcg96_Lfr3YhKnT82GbiGcub1r7Y",
  // };

  try {
    await admin.messaging().sendMulticast({
      tokens: d,
      notification: {
        title: "New Signal " + req.body.name,
        body: "Check out This Signal now !!!",
      },
    });

    res.status(200).json({ msg: "Sucesfull" });
    console.log("DONE");
  } catch (error) {
    console.log(error);
  }

  // admin
  //   .messaging()
  //   .send(message)
  //   .then((res) => res.send("SUCESSFULL"))
  //   .catch((err) => res.send(err));
});
module.exports = router;
