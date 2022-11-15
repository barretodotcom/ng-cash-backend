import amqp from 'amqplib';

const environ = process.env

const connectionString = `
    amqp://${environ.AMQP_USER}:${environ.AMQP_PASS}@${environ.AMQP_HOST}:${environ.AMQP_PORT}/${environ.AMQP_VHOST}
`

export class RabbitMQConnection {


    static async sendMessageTo(queue: string, message: any) {
        const connection = await amqp.connect(connectionString);

        const channel = await connection.createChannel();

        await channel.assertQueue(queue, {
            durable: false,
            autoDelete: true,
            arguments: {
                'x-queue-mode': 'lazy'
            }
        })
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

    }
}