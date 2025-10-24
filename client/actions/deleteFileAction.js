import fs from "fs"

function deleteFileAction(filePath) {
    fs.unlink(filePath, (err) => {
        if(err) {
            console.log("Something went wrong", err)
        }
    })
}

export default deleteFileAction