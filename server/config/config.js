// Port

process.env.PORT = process.env.PORT || 3000;

// Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Database

let databaseUrl = 'mongodb+srv://administrator:fugZEbE0c5ZPlYsr@cluster0-yoadt.mongodb.net/cafe?retryWrites=true&w=majority'

if(process.env.NODE_ENV === 'dev'){
  databaseUrl = 'mongodb://localhost:27017/cafe';
}

process.env.DATABASE_URL = databaseUrl;

 