import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs';
import {fakerFR as faker} from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
    const salt = bcrypt.genSaltSync(10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com'},
        update: {},
        create: {
            email: 'admin@example.com',
            password: bcrypt.hashSync('admin', salt),
            username: 'admin',
            roles: ['admin'],
        }
    })
    const user = await prisma.user.upsert({
        where: { email: 'user@example.com'},
        update: {},
        create: {
            email: 'user@example.com',
            password: bcrypt.hashSync('user', salt),
            username: 'user',
            roles: ['user'],
        }
    });

    const userList = await prisma.list.create({
        data: {
            name: faker.lorem.sentence(3),
            userId: user.id
        }
    });

    for (let i = 0; i < 10; i++) {
        await prisma.task.create({
            data: {
                name: faker.lorem.sentence(5),
                listId: userList.id,
            }
        })
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })