import dotenv from "dotenv";

dotenv.config();
if(!process.env.MONGO_URL){
    throw new Error("MONGO_URL is not defined in the environment variables");
}
if(!process.env.JWT_ACCESS_SECRET){
    throw new Error("JWT_ACCESS_SECRET is not defined in the environment variables");
}
if(!process.env.JWT_REFRESH_SECRET){
    throw new Error("JWT_REFRESH_SECRET is not defined in the environment variables");
}
if(!process.env.JWT_REGISTRATION_SECRET){
    throw new Error("JWT_REGISTRATION_SECRET is not defined in the environment variables");
}
if(!process.env.SMTP_EMAIL){
    throw new Error("SMTP_EMAIL is not defined in the environment variables");
}
if(!process.env.SMTP_PASSWORD){
    throw new Error("SMTP_PASSWORD is not defined in the environment variables");
}

const config  = {
    MONGO_URL : process.env.MONGO_URL,
    JWT_REFRESH_SECRET : process.env.JWT_REFRESH_SECRET,
    JWT_ACCESS_SECRET : process.env.JWT_ACCESS_SECRET,
    JWT_REGISTRATION_SECRET : process.env.JWT_REGISTRATION_SECRET,
    SMTP_EMAIL : process.env.SMTP_EMAIL,
    SMTP_PASSWORD : process.env.SMTP_PASSWORD,
    NODE_ENV : process.env.NODE_ENV || "development",
}
export default config;