

import { connect } from "mongoose"

export default  async () => {

    try {

        await connect("mongodb://0.0.0.0:27017/mongo_course");
    }catch(err) {
        console.error("Something went happened", err);
    }

}

