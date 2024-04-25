const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {
	S3Client,
	GetObjectCommand,
	PutObjectAclCommand,
	PutObjectCommand,
} = require("@aws-sdk/client-s3");

const s3client = new S3Client({
	region: "ap-south-1",
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

exports.getPresignedURL = async (req, res, next) => {
	console.log(req);
	let { key, type, contentType } = req.query;
	try {
		let command;
		if (type === "upload")
			command = new PutObjectCommand({
				Bucket: "bucket.loveakot",
				Key: key,
				ContentType: contentType,
			});
		else {
			command = new GetObjectCommand({
				Bucket: "bucket.loveakot",
				Key: key,
			});
		}

		getSignedUrl(s3client, command).then((val) => {
			console.log(val);
			res.status(200).json({
				status: "success",
				key: val,
			});
		});
	} catch (error) {
		console.error("Error registering user:", error);
		res.status(500).send("Internal server error");
	}
};
