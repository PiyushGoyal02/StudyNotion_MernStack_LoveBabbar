const cloudinary = require("cloudinary").v2

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
    const options = {folder}

    if(height){
        options.height = height;
    }

    if(quality){
    options.quality = quality;
    }

    options.resoure_tyep = auto;

    return await cloudinary.uploader.upload(file.temmPath, options);
}