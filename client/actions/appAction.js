import {execFile} from "child_process"

function appAction(exePath) {
    if(exePath.includes("obs64.exe")) {
        const obsCwd = "C:\\Program Files\\obs-studio\\bin\\64bit\\"

        execFile(exePath, [], {cwd: obsCwd}, (error, stdout, stderr) => {
            if (error) {
                console.log("Something went wrong:", error)
            }
            console.log(stdout)
            if(stderr) {
                console.error("Stderr:", stderr)
            }
        })
    } else {
        execFile(exePath, (error, stdout, stderr) => {
            if (error) {
                console.log("Something went wrong:", error)
            }
            console.log(stdout)
            if(stderr) {
                console.error("Stderr:", stderr)
            }
        })
    }
}

export default appAction