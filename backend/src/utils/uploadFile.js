const { APP_DIR } = require("../config.js")
const path = require("path")
const uuid = require("uuid")

function fileExtensionGet(fileName){
    const splitFileName = fileName.split(".")
    const extension = splitFileName[splitFileName.length - 1]
    return extension

}

exports.fileSqlTypeGet = function(file){
    console.log("fileSqlTypeGet", file.mimetype)
    if(file.mimetype.includes("image")){
        console.log("return")
        return 1
    }else if(file.mimetype.includes("video")){
        return 2
    }
    console.log("123")
    throw "無效檔案類型"
}

exports.fileSave = async function(file, fileName) {
    const randomFileName = uuid.v4() + "." + fileExtensionGet(fileName)
    return new Promise((resolve, reject)=>{
        const filePath = path.join(APP_DIR, `/uploads/${randomFileName}`) 
        file.mv(filePath, err => {
            if (err) {
             reject(err)
            }
            resolve(randomFileName)
           });      
    })
  
}

