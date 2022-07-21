import { Router } from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import session from 'express-session';
import GoogleStrategy from 'passport-google-oidc';
import { UserRepository } from '../Database/Repositories/Concrete/UserRepository';
import { Users } from '../Entities/Users';
import { randomUUID } from 'crypto';

const db = new UserRepository();
const usersRouter = Router();

dotenv.config();

usersRouter.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { secure: 'auto', httpOnly: true },
  }),
);

usersRouter.use(passport.initialize());
usersRouter.use(passport.session());
usersRouter.use(passport.authenticate('session'));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  cb(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3002/users/google/callback',
    },
    async function verify(issuer, profile, cb) {
      //console.log('profile: ', profile, '\nissuer: ', issuer);
      try {
        const user = await db.getUserByEmail(profile.emails[0].value);
        //console.log('Usuário encontrado: ', user);
        if (!user) {
          await db.createUser({
            idOauth: profile.id,
            email: profile.emails[0].value,
            name: profile.name.givenName,
            issuer: issuer,
            uuid: randomUUID(),
          });
        }
      } catch (e) {
        console.log(e);
      }
      cb(null, profile);
    },
  ),
);

usersRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: /*'/users/user'*/ 'http://localhost:3000/accidents',
    failureRedirect: '/auth/failure',
  }),
);

usersRouter.get('/getAllUsers', async (req, res) => {
  console.log('request getallusers feito');
  const users = await db.getAllUsers();
  return res
    .json({
      users: users,
    })
    .status(200);
});

usersRouter.get('/logout', async (req, res) => {
  if (req.session !== null || undefined) {
    req.session.destroy(function (err) {
      console.log('Error no .destroy:', err);
    });
    console.log('Logout efetuado com sucesso.');
    res.send(`logout efetuado com sucesso, Session: ${req.session}`);
  }
});

usersRouter.get('/login', (req, res) => {
  res.send('<a href="auth/google">Autenticação com Google</a>');
});

usersRouter.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

usersRouter.get('/user', async (req, res) => {
  /*const user = req.session.passport.user;
  res.send(user);*/
  //res.send(req.session);
  if (req.session.passport === undefined) {
    console.log('Session: undefined');
  } else if (req.session.passport !== undefined) {
    //const user = req.session.passport.user;
    console.log('Passport user = ', req.session.passport.user);
    const databaseUser = await db.getUserByEmail(req.session.passport.user.emails[0].value);
    const user = {
      name: req.session.passport.user.name.givenName,
      email: req.session.passport.user.emails[0].value,
      password: databaseUser.password,
      cnpj: databaseUser.companyCnpj,
    };

    res.send(user);
  }

  usersRouter.put('/patch/:email', async (req, res) => {
    console.log('Router patchUser: ', req.params.email, req.body);
    //await db.patchUser(req.params.email, req.body);
    try {
      if ((await db.patchUser(req.params.email, req.body.companyCnpj)) === true) {
        return res
          .json({
            message: 'Sucess at /patchUser',
            dataInserted: req.body,
          })
          .status(200);
      } else if ((await db.patchUser(req.params.email, req.body.companyCnpj)) === false) {
        return res
          .json({
            message: 'Error at /patchUser',
          })
          .status(404);
      }
    } catch (error) {
      return res
        .json({
          message: 'Error at /patchUser',
          error: error,
        })
        .status(404);
    }
  });

  return;
});

/* Endpoint usado no sistema anterior para devolver dados do usuário armazenados na sessão
com alguns dados que se encontram apenas no banco de dados como company_id e cnpj

usersRouter.get('/user', async (req, res) => {
  console.log('session:', req.user);
  try {
    const databaseUser = await db.getUserByEmail(req.user.emails[0].value);
    console.log('databaseuser:', databaseUser.company_id);
    const user = {
      email: req.user.emails[0].value,
      id: req.user.id,
      givenName: req.user.name.givenName,
      familyName: req.user.name.familyName,
      cnpj: databaseUser.cnpj,
      company_id: databaseUser.company_id,
    };
    res.json(user);
  } catch (e) {
    res.json({ error: 'ocorreu um erro' }).status(500);
  }
}); 

*/

export { usersRouter };
