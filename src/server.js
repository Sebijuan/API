require('dotenv').config();
const app = require('./app');

console.log('MONGO_URI:', process.env.MONGO_URI); // Add this line to debug

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
