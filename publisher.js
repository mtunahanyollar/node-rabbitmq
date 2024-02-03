const amqp = require("amqplib")

const message = {
    description : "This is a test message."
}

const data = require("./data.json");
const queueName = process.argv[2] || "jobsQueue";


connect_rabbitmq();

async function connect_rabbitmq(){
    try{
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const assertion = await channel.assertQueue(queueName);
    
        data.forEach(element => {
            message.description = element.id;
            channel.sendToQueue(queueName,Buffer.from(JSON.stringify(message)));
            console.log("Message has sent", element.id);
        });
        

        // == I N T E R V A L == //
        // setInterval(() => {
        //     message.description = new Date().getSeconds();
        //     channel.sendToQueue(queueName,Buffer.from(JSON.stringify(message)));
        //     console.log("Message has sent", message);
        // },1);
        // == I N T E R V A L == //
    }
    catch(error){
        console.log("Error", error)
    }

}