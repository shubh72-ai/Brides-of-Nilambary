type Mongoose = typeof import("mongoose")["default"];

type CachedConnection = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

const globalForMongoose = globalThis as typeof globalThis & {
  mongooseConnection?: CachedConnection;
};

const cached =
  globalForMongoose.mongooseConnection ??
  (globalForMongoose.mongooseConnection = { conn: null, promise: null });

export async function connectMongo() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  const { default: mongoose } = await import("mongoose");

  cached.promise ??= mongoose.connect(uri, {
    bufferCommands: false,
  });

  cached.conn = await cached.promise;
  return cached.conn;
}
