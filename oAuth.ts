import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import { Users } from './src/Entities/Users'
import GoogleStrategy from 'passport-google-oidc';

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3002/google/callback",
  },
  async function verify(issuer, profile, cb){
    //console.log('profile: ', profile, '\nissuer: ', issuer)
    try{
      const user = await Users.findOne({
      where: {
        email: profile.emails[0].value
      }
    })
    //console.log('Usuário encontrado: ', user)
    if (!user){
      await Users.create({
        idOauth: profile.id,
        email: profile.emails[0].value,
        name: profile.name.givenName,
        issuer: issuer
      });
    }

    }catch(e){
      console.log(e)
    }
    cb(null, profile)
  }
))



























///////////
const sRedirect= "http://localhost:3000/accidents"
const app = express();
app.use(session( {
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { secure: 'auto', httpOnly: true }
  }));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'))

passport.serializeUser(function(user, cb){
  cb(null, user);
})

passport.deserializeUser(function(user, cb){
  cb(null, user);
})

app.get('/login', (req, res) =>{
  res.send('<a href="/auth/google">Autenticação com Google</a>')
});

app.get('/auth/google',
passport.authenticate('google', { scope: ['email', 'profile'] })
)


app.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: sRedirect,
    failureRedirect: '/auth/failure',
  }))

app.get('/auth/failure', (req, res) => {
  res.sendStatus(401)
});

app.use(function (req, res, next) {
  if (req.user) {
    return next();
  }
  res.status(401).json({ message: "É necessário um usuário autenticado." });
  });

app.get('/logout', (req, res) => {
  req.session.destroy();
  console.log('Logout efetuado com sucesso.');
  })

app.get('/user', async (req, res) => {
  console.log('session:', req.user)
  try{
  const databaseUser = await User.findByPk(req.user.emails[0].value)
  console.log('databaseuser:', databaseUser.company_id)
  const user = {
    email: req.user.emails[0].value,
    id: req.user.id,
    givenName: req.user.name.givenName,
    familyName: req.user.name.familyName,
    cnpj: databaseUser.cnpj,
    company_id : databaseUser.company_id
  }
  res.json(user)
  } catch (e) {
    res.json({ error: "ocorreu um erro" }).status(500);
  }
})
app.get('/userSession', (req, res) => {
  res.json(req.user)
  console.log(req.user)
})
app.get("/user/:email", async (req, res) => {
  const pk = req.params.email.substr(1, req.params.email.lenght) //usar req.params.email retorna ":email"
  try {
    const user = await User.findByPk(pk);
    res.send(user);
  } catch (e) {
    res.json({ error: "ocorreu um erro na procura de usuário por email" }).status(500);
  }
});
app.patch("/user/patch/:email", async (req, res) => {
  try {
    const user = await User.findByPk(req.body.email);
    //console.log('user findPk:\n', user, '\nbody:\n', req.body)
    await user.update(req.body);
    res.status(200).send("")
  } catch (e) {
    //res.json({ error: e });
    res.status(400).send("")
  }
});