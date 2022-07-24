const url ='mongodb://localhost:27017';
const fs = require('fs');
const mongodb = require ('mongodb');
exports.uploadVideo =  (req, res)=>{
    mongodb.MongoClient.connect(url, (error, client)=>{
        if(error){ res.json(error)
        return
    }
    const db = client.db('videos');
    const bucket = new mongodb.GridFSBucket(db);
    const videoUploadStream = bucket.openUploadStream('Static_vs_Dynamic_API');
    const videoReadStream = fs.createReadStream('./Static_vs_Dynamic_API.mp4')
    videoReadStream.pipe(videoUploadStream)
    res.status(200).send('Done..')
    })
}

exports.mongoVideos = (req, res) => {
    mongodb.MongoClient.connect(url, (error, client)=>{
        if(error){ res.json(error)
        return
    }
    res.setHeader('Accept-Ranges', 'bytes')
    res.setHeader('Content-Type', 'video/mp4')
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
        return;
    }
    const db = client.db('videos')
    console.log(req.params.id);
    db.collection('fs.files').findOne({_id:mongoose.Types.ObjectId(req.params.id)}, (err, video)=>{
        if(!video){
            res.status(404).send('No video uploaded');
            return;
        }
    const videoSize = video.length;
    const start = Number(range.replace(/\D/g, ""));
    const end = videoSize - 1;
    
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start} - ${end}/${videoSize}`,
        "Content-Length": contentLength,
    }
    //206 = 'partial content
    res.writeHead(206, headers)

    const bucket = new mongodb.GridFSBucket(db)
    const downloadStream= bucket.openDownloadStreamByName('Static_vs_Dynamic_API', {
       start
    });
    downloadStream.pipe(res)
})
}) 
}
exports.localVideos =  (req, res) => {
    res.setHeader('Accept-Ranges', 'bytes')
    res.setHeader('Content-Type', 'video/mp4')
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
        return;
    }
    const videoPath = 'public/assets/videos/Static_vs_Dynamic_API.mp4';
    const videoSize = fs.statSync(videoPath).size;
    const chunkSize = 10 ** 6; // 1MB

    // replacing all the non-digits chars with a string
    const start = Number(range.replace(/\D/g, ''));
    //If the total chunk sent from the start is higher than the videos size it means the video has ended, hence do nothing 
    const end = Math.min(start + chunkSize, videoSize - 1)
    const contentLength = end - start + 1;

    const headers = {
        "Content-Range": `bytes ${start} - ${end}/${videoSize}`,
        "Content-Length": contentLength,
    }
    //206 = 'partial content
    res.writeHead(206, headers)

    const stream = fs.createReadStream(videoPath, {
        start
    })
    stream.pipe(res)

}