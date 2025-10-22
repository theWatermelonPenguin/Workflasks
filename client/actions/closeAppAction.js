import {exec} from "child_process"

function closeAppAction(exeName) {
    exec(`taskkill /IM ${exeName} /F`, (err) => {
        if(err) {
            console.log("Something went wrong", err)
        }
    })
}

export default closeAppAction