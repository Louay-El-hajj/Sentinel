const { admin } = require("../config/notifications/notification.config.js");

const sendNotification = ({
    registrationToken,
    systemName,
    itemName,
    temperature,
}) => {
    //Setting up notification structure
    const title = `${systemName}: Peak detected`;
    const body = `Detected a peak of ${temperature}A in ${itemName}`;

    try {
        //Creating a message
        const message = {
            notification: {
                title: title,
                body: body,
            },
            token: registrationToken,
        };

        //Sending message
        admin
            .messaging()
            .send(message)
            .then(response => {
                // Response is a message ID string.
                console.log("Successfully sent message:", response);
            })
            .catch(error => {
                console.log("Error sending message:", error);
            });

        //Returning success message
    } catch (error) {
        console.log(error.message);
    }
};

const testNotification = (req, res) => {
    const { registrationToken, systemName, itemName, temperature } = req.body;
    sendNotification({
        registrationToken,
        systemName: systemName,
        itemName: itemName,
        temperature: temperature,
    });
    res.status(200).json({ message: "Notification sent" });
};

module.exports = {
    sendNotification,
    testNotification,
};
