import { Router } from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import session from 'express-session';
import GoogleStrategy from 'passport-google-oidc';
import { UserRepository } from '../Database/Repositories/Concrete/UserRepository'
import { Users } from '../Entities/Users'

const db = new UserRepository()
const usersRouter = Router()

dotenv.config();

usersRouter.use(session( {
  secret: process.env.SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: { secure: 'auto', httpOnly: true }
}));

usersRouter.use(passport.initialize());
usersRouter.use(passport.session());
usersRouter.use(passport.authenticate('session'))

passport.serializeUser(function(user, cb){
  cb(null, user);
})

passport.deserializeUser(function(user, cb){
  cb(null, user);
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3002/google/callback",
  },
  async function verify(issuer, profile, cb){
    //console.log('profile: ', profile, '\nissuer: ', issuer)
    try{
      const user = await db.getUserByEmail(profile.emails[0].value)
    //console.log('Usuário encontrado: ', user)
    if (!user){
      await db.createUser({
        idOauth: profile.id,
        email: profile.emails[0].value,
        name: profile.name.givenName,
        issuer: issuer,
        id: null,
        uuid: null,
        password: null,
        created_at: null
      });
    }

    }catch(e){
      console.log(e)
    }
    cb(null, profile)
  }


))

usersRouter.get('/logout', (req, res) => {
    req.session.destroy();
    console.log('Logout efetuado com sucesso.');
    })
  
usersRouter.get('/user', async (req, res) => {
  console.log('session:', req.user)
  try{
  const databaseUser = await db.getUserByEmail(req.user.emails[0].value)
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

usersRouter.get('/userSession', (req, res) => {
  res.json(req.user)
  console.log(req.user)
  })

usersRouter.get("/user/:email", async (req, res) => {
  
  });

export { usersRouter };
