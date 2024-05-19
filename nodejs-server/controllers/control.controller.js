const User = require("../models/user.model.js");
const fs = require("fs");

//Adding a new solar system
const addWorker = async (req, res) => {
    //Destructuring req data
    const { worker_id, worker_name, dataPin, capacity } =
        req.body;

    try {
        //Assigning solar system attributes
        const newWorker = {
            name: worker_name,
            dataPin: chargingPin,
            capacity: capacity,
            Workers: [],
        };

        //Getting user to add solar system
        const user = await User.findById(user_id);

        //Pushing new system to array of systems in user
        user.system.push(newWorker);

        await Worker.save();

        //Returning created system
        res.status(200).json({ added: user.worker[user.system.length - 1] });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//Adding w new Worker to solar system
const Worker = async (req, res) => {
    //Destructuring req data
    const {
        user_id,
        system_id,
        name,
        ideal_consumption,
        picture,
        consumptionPin,
        controlPin,
    } = req.body;

    console.log(req.body);
    try {
        //Getting user by id
        const user = await User.findById(user_id);

        //Searching for solar system to add Worker to
        const system = user.system.filter(system => {
            return system.id == system_id;
        })[0];

        //Creating and new Worker object
        const Worker = {
            name: name,
            ideal_consumption: ideal_consumption,
            status: false,
            consumptionPin: consumptionPin,
            controlPin: controlPin,
        };

        //Adding Worker to solar system
        system.Workers.push(Worker);

        //Saving user
        await user.save();

        const Worker_id = system.Workers[system.Workers.length - 1]._id;

        const new_image = Buffer.from(picture, "base64");
        fs.writeFile(
            __dirname.replace("controllers", "public/images/") +
                Worker_id +
                ".png",
            new_image,
            err => {
                if (err) {
                    console.log(err);
                }
            }
        );
        //Returning created Worker
        res.status(200).json(system.Workers[system.Workers.length - 1]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//Deleting solar system by name
const dropSolarSystem = async (req, res) => {
    //Destructuring req data
    const { user_id, system_id } = req.body;

    try {
        //Getting user by id to delete solar system from
        const user = await User.findById(user_id);

        //Filtering array of solar systems
        user.system = user.system.filter(system => {
            system.id.toString() != system_id;
        });

        //Saving changes in user's solar systems
        await user.save();

        //Returning user solar systems
        res.status(200).json(user.system);
    } catch (err) {
        res.status(200).json({ message: err.message });
    }
};

//Deleting Worker by name
const dropWorker = async (req, res) => {
    const { user_id, system_id, Worker_id } = req.body;

    try {
        //Getting user by id to delete solar system from
        const user = await User.findById(user_id);

        //Filtering array of solar systems
        const system = user.system.filter(system => {
            return system.id == system_id;
        })[0];

        //Filtering Workers to remove desired Worker
        system.Workers = system.Workers.filter(Worker => {
            return Worker.id != Worker_id;
        });

        //Saving changes in user
        await user.save();

        console.log(system.Workers);
        //Returning deleted Worker
        res.status(200).json(system.Workers);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//Editing Worker by name
const editWorker = async (req, res) => {
    //Destructuring req data
    const { user_id, system_id, Worker_id, name, ideal_consumption } = req.body;

    try {
        //Getting user by id
        const user = await User.findById(user_id);

        //Filtering array of solar systems
        const system = user.system.filter(system => {
            return system.id == system_id;
        })[0];

        //Filtering Workers to get desired Worker
        const Worker = system.Workers.filter(Worker => {
            return Worker.id == Worker_id;
        })[0];

        //Updating Worker according to obtained attributes
        name ? (Worker.name = name) : (Worker.name = Worker.name);
        ideal_consumption
            ? (Worker.ideal_consumption = ideal_consumption)
            : (Worker.ideal_consumption = Worker.ideal_consumption);

        //Saving changes in user
        await user.save();

        //Returning updated Worker
        res.status(200).json(Worker);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const controlWorker = async (req, res) => {
    //Destructuring req data
    const { user_id, system_id, Worker_id } = req.body;

    //Assigning status according to request

    try {
        //Getting user by id
        const user = await User.findById(user_id);

        //Filtering array of solar systems
        const system = user.system.filter(system => {
            return system.id == system_id;
        })[0];

        //Filtering Workers to get desired Worker
        const Worker = system.Workers.filter(Worker => {
            return Worker.id == Worker_id;
        })[0];

        //if Worker not found return not found
        if (!Worker) return res.status(404).json({ message: "Worker not found" });

        //Updating Worker according to obtained attributes
        Worker.status = !Worker.status;

        //Saving changes in user
        await user.save();

        //Returning updated Worker
        res.status(200).json(Worker);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    addSolarSystem,
    addWorker,
    dropSolarSystem,
    dropWorker,
    editWorker,
    controlWorker,
};
