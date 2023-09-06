import "dotenv/config";
async function getEnv() {
  return new Promise<boolean>((resolve, reject) => {
    const {
      AMBIENTE,
      PORT,

      DBUSER,
      DBPASS,

      JWT_SECRET,
    } = process.env;

    if (!AMBIENTE || !PORT || !DBUSER || !DBPASS || !JWT_SECRET) {
      reject(false);
    }
    resolve(true);
  });
}

export default {
  getEnv,
};
