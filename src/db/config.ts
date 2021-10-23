import { Student } from "../entities/Students"
import { createConnection } from "typeorm"

export const newConnection = async () => {
    await createConnection ({
        type: "postgres",
        url: process.env.DATABASE_URL,
        entities: [Student],
        synchronize: true,
        extra: {
            ssl:{
                rejectUnauthorized: false
            },
        },
    });

    console.log('Conectado ao DataBase');
};