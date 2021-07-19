import strings from "../material/strings"

//dataImage == array
export function getImageList(dataImage){
    var imageData = JSON.parse(dataImage)
    var data = []
    for(var i = 0; i < imageData.length; i++){
        data.push(imageData[i].url)
    }
    var dataStr = []
    for(var i = 0; i < data.length; i++){
        var dataG = data[i]
        if(String(dataG).includes('||')){
            var split = dataG.split('||')
            for(var o = 0; o < split.length; o++){
                dataStr.push(split[o])
            }
        }else{
            dataStr.push(dataG)
        }
    }
    return dataStr
}