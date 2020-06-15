// Port

process.env.PORT = process.env.PORT || 3000;

// Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Database

if(process.env.NODE_ENV === 'dev'){
  process.env.DATABASE_URL  = 'mongodb://localhost:27017/cafe';
}else{
  process.env.DATABASE_URL = process.env.DATABASE_URL;
}
