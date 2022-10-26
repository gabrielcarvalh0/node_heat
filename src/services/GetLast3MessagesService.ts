
import prismaClient from '../prisma/index'
class GetLast3MessagesService {
  async execute() {
    const messages = await prismaClient.message.findMany({
      // take me tras a quantidade de messages que quero trazer, no caso 03
      take: 3,
       orderBy:{
        created_at: "desc"
       },
       include: {
        user: true
       }
    }); 

    //  select * from messages limit 3 order by created at desc
    return messages;

  }
}

export { GetLast3MessagesService }
