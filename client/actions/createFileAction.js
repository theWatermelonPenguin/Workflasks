import fs from "fs"

function createFile(path, contents) {
    fs.writeFile(path, contents, (err) => {
        if(err){
            console.log("Something went wrong", err)
        } else {
            console.log("Success")
        }
    })
}

export default createFile