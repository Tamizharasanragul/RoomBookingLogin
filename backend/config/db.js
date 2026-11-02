import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
dotenv.config({ path: path.join(__dirname, '..', '.env') });
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });
dotenv.config({ path: path.join(__dirname, '..', 'routes', '.env') });

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb+srv://ragultamizharasan_db_user:geUWDDthIYxb3MQc@booking.p7wnqvo.mongodb.net/demoproject?retryWrites=true&w=majority';
  const localFallbackURI = 'mongodb://127.0.0.1:27017/demoproject';

  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 8000
    });
    console.log('✅ MongoDB Atlas connected successfully!');
    console.log('📦 Database:', mongoose.connection.name);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);

    // If Atlas connection has issues, fall back to local MongoDB
    if (mongoURI !== localFallbackURI) {
      try {
        console.log('🔄 Attempting fallback connection to Local MongoDB (127.0.0.1:27017)...');
        await mongoose.disconnect();
        await mongoose.connect(localFallbackURI, {
          serverSelectionTimeoutMS: 3000
        });
        console.log('✅ Connected to Local MongoDB fallback successfully!');
        console.log('📦 Database:', mongoose.connection.name);
      } catch (localErr) {
        console.error('❌ Local fallback also failed:', localErr.message);
      }
    }
  }
};

export default connectDB;
