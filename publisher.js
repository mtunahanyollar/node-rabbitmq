const amqp = require("amqplib")

const message = {
    description : "Test message GG"
}
const queueName = process.argv[2] || "jobsQueue";
connect_rabbitmq();

async function connect_rabbitmq(){
    try{
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const assertion = await channel.assertQueue(queueName);
    
        setInterval(() => {
            message.description = new Date().getSeconds();
            channel.sendToQueue(queueName,Buffer.from(JSON.stringify(message)));
            console.log("Message has sent", message);
        },1);
    }
    catch(error){
        console.log("Error", error)
    }

}