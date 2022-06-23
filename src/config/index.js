require('dotenv').config();


const config = {
  production: process.env.NODE_ENV === 'production',
  development: process.env.NODE_ENV === 'development',
  port: process.env.PORT || 3000,
  db: {
    uri: process.env.DB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwtSecret: process.env.JWT_SECRET,
  saltRounds: Number.parseInt(process.env.SALT_ROUNDS) || 10,
  secretSession: process.env.SECRET_SESSION || 'secret',
  googleProjectId: process.env.GOOGLE_PROJECT_ID,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL,
  googleBucketName: process.env.GOOGLE_BUCKET_NAME,
}


module.exports = config;  