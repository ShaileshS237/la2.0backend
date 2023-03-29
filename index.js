const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
const News = require("./model/news");

require("./connection/db.js");

const app = express();
app.use(express.json());

const bajarbhav_route = require("./routes/bajarbhav");
const news_route = require("./routes/news");
const codered_route = require("./routes/codered");
const blooddonar_route = require("./routes/blooddonar");

var corsOptions = {
	origin: "*",
};

app.use(cors(corsOptions));

var transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "shailesh_32113223@nitkkr.ac.in",
		pass: "bhptmdtrnybdbetv",
	},
});

app.get("/", (req, res) => {
	res.json({
		message: "Welcome to LOVE ❤️ AKOT ",
	});
});

app.use("/bajarbhav", bajarbhav_route);
app.use("/news", news_route);
app.use("/codered", codered_route);
app.use("/blooddonar", blooddonar_route);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

// const express = require("express");
// const mongoose = require("mongoose");
// const nodemailer = require("nodemailer");

// const app = express();
// app.use(express.json());

// var corsOptions = {
// 	origin: "*",
// };

// var transporter = nodemailer.createTransport({
// 	service: "gmail",
// 	auth: {
// 		user: "shailesh_32113223@nitkkr.ac.in",
// 		pass: "bhptmdtrnybdbetv",
// 	},
// });

// app.get("/", (req, res) => {
// 	res.json({
// 		message: "Welcome to LOVE ❤️ AKOT ",
// 	});
// });

// app.get("/sendmail", (req, res) => {
// 	var mailOptions = {
// 		from: "shailesh_32113223@nitkkr.ac.in",
// 		to: "ayndri.auum@niisgroup.org",
// 		subject: "Testing AUUM Promotion Email_New",
// 		text: "For clients with plaintext support only",
// 		html: `<!DOCTYPE html>
// 		<html
// 			lang="en"
// 			xmlns="http://www.w3.org/1999/xhtml"
// 			xmlns:v="urn:schemas-microsoft-com:vml"
// 			xmlns:o="urn:schemas-microsoft-com:office:office"
// 		>
// 			<head>
// 				<meta charset="utf-8" />
// 				<meta name="viewport" content="width=device-width" />
// 				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
// 				<meta name="x-apple-disable-message-reformatting" />
// 				<title></title>

// 				<link
// 					href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700,700i"
// 					rel="stylesheet"
// 				/>
// 				<link
// 					href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
// 					rel="stylesheet"
// 				/>

// 				<link
// 					href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
// 					rel="stylesheet"
// 				/>

// 				<style>
// 					html,
// 					body {
// 						margin: 0 auto !important;
// 						padding: 0 !important;
// 						height: 100% !important;
// 						width: 100% !important;
// 						background: #f1f1f1;
// 					}
// 					* {
// 						-ms-text-size-adjust: 100%;
// 						-webkit-text-size-adjust: 100%;
// 					}

// 					div[style*="margin: 16px 0"] {
// 						margin: 0 !important;
// 					}

// 					table,
// 					td {
// 						mso-table-lspace: 0pt !important;
// 						mso-table-rspace: 0pt !important;
// 					}

// 					table {
// 						border-spacing: 0 !important;
// 						border-collapse: collapse !important;
// 						table-layout: fixed !important;
// 						margin: 0 auto !important;
// 					}

// 					img {
// 						-ms-interpolation-mode: bicubic;
// 					}

// 					a {
// 						text-decoration: none;
// 					}

// 					*[x-apple-data-detectors],
// 				/* iOS */
// 				.unstyle-auto-detected-links *,
// 				.aBn {
// 						border-bottom: 0 !important;
// 						cursor: default !important;
// 						color: inherit !important;
// 						text-decoration: none !important;
// 						font-size: inherit !important;
// 						font-family: inherit !important;
// 						font-weight: inherit !important;
// 						line-height: inherit !important;
// 					}

// 					.a6S {
// 						display: none !important;
// 						opacity: 0.01 !important;
// 					}

// 					.im {
// 						color: inherit !important;
// 					}

// 					img.g-img + div {
// 						display: none !important;
// 					}

// 					@media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
// 						u ~ div .email-container {
// 							min-width: 320px !important;
// 						}
// 					}

// 					@media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
// 						u ~ div .email-container {
// 							min-width: 375px !important;
// 						}
// 					}

// 					@media only screen and (min-device-width: 414px) {
// 						u ~ div .email-container {
// 							min-width: 414px !important;
// 						}
// 					}
// 				</style>

// 				<style>
// 					.primary {
// 						background: #f3a333;
// 					}

// 					.bg_white {
// 						background: #ffffff;
// 					}

// 					.bg_light {
// 						background: #fafafa;
// 					}

// 					.bg_black {
// 						background: #000000;
// 					}

// 					.bg_dark {
// 						background: black;
// 					}

// 					.email-section {
// 						padding: 2.5em;
// 					}

// 					/*BUTTON*/
// 					.btn {
// 						padding: 10px 15px;
// 					}

// 					.btn .new {
// 						border-radius: 5px;
// 					}

// 					.btn .btn-primary {
// 						border-radius: 30px;
// 						background: #1f94b8;
// 						color: #ffffff;
// 					}

// 					h1,
// 					h2,
// 					h3,
// 					h4,
// 					h5,
// 					h6 {
// 						font-family: "Montserrat", sans-serif;
// 						font-weight: 700;
// 						color: #fff;
// 						margin-top: 0;
// 						text-align: center;
// 					}

// 					body {
// 						font-family: "Montserrat", sans-serif;
// 						font-weight: 400;
// 						font-size: 15px;
// 						line-height: 1.8;
// 						color: rgba(0, 0, 0, 0.4);
// 					}

// 					a {
// 						color: white;
// 					}

// 					table {
// 					}

// 					/*LOGO*/

// 					.logo h1 {
// 						margin: 0;
// 					}

// 					.logo h1 a {
// 						color: #000;
// 						font-size: 20px;
// 						font-weight: 700;
// 						text-transform: uppercase;
// 						font-family: "Montserrat", sans-serif;
// 					}

// 					/*HERO*/
// 					.hero {
// 						position: relative;
// 					}

// 					.hero img {
// 					}

// 					.hero .text {
// 						color: rgba(255, 255, 255, 0.8);
// 					}

// 					.hero .text h2 {
// 						color: #ffffff;
// 						font-size: 30px;
// 						margin-bottom: 0;
// 					}

// 					/*HEADING SECTION*/
// 					.heading-section {
// 					}

// 					.heading-section h2 {
// 						color: #000000;
// 						font-size: 28px;
// 						margin-top: 0;
// 						line-height: 1.4;
// 					}

// 					.heading-section .subheading {
// 						margin-bottom: 10px !important;
// 						display: inline-block;
// 						font-size: 13px;
// 						text-transform: uppercase;
// 						letter-spacing: 2px;
// 						color: rgba(0, 0, 0, 0.4);
// 						position: relative;
// 					}

// 					.heading-section .subheading::after {
// 						position: absolute;
// 						left: 0;
// 						right: 0;
// 						bottom: -10px;
// 						content: "";
// 						width: 100%;
// 						height: 2px;
// 						background: #1f94b8;
// 						margin: 0 auto;
// 					}

// 					.heading-section-white {
// 						color: rgba(255, 255, 255, 0.8);
// 					}

// 					.heading-section-white h2 {
// 						font-size: 28px;
// 						line-height: 1;
// 						padding-bottom: 0;
// 					}

// 					.heading-section-white h2 {
// 						color: #ffffff;
// 					}

// 					.heading-section-white .subheading {
// 						margin-bottom: 0;
// 						display: inline-block;
// 						font-size: 13px;
// 						text-transform: uppercase;
// 						letter-spacing: 2px;
// 						color: rgba(255, 255, 255, 0.4);
// 					}

// 					.icon {
// 						text-align: center;
// 					}

// 					.icon img {
// 					}

// 					/*SERVICES*/
// 					.text-services {
// 						padding: 10px 10px 0;
// 						text-align: center;
// 					}

// 					.text-services h3 {
// 						font-size: 20px;
// 					}

// 					/*BLOG*/
// 					.text-services .meta {
// 						text-transform: uppercase;
// 						font-size: 14px;
// 					}

// 					/*TESTIMONY*/
// 					.text-testimony .name {
// 						margin: 0;
// 					}

// 					.text-testimony .position {
// 						color: rgba(0, 0, 0, 0.3);
// 					}

// 					/*VIDEO*/
// 					.img {
// 						width: 100%;
// 						height: auto;
// 						position: relative;
// 					}

// 					.img .icon {
// 						position: absolute;
// 						top: 50%;
// 						left: 0;
// 						right: 0;
// 						bottom: 0;
// 						margin-top: -25px;
// 					}

// 					.img .icon a {
// 						display: block;
// 						width: 60px;
// 						position: absolute;
// 						top: 0;
// 						left: 50%;
// 						margin-left: -25px;
// 					}

// 					/*COUNTER*/
// 					.counter-text {
// 						text-align: center;
// 					}

// 					.counter-text .num {
// 						display: block;
// 						color: #ffffff;
// 						font-size: 34px;
// 						font-weight: 700;
// 					}

// 					.counter-text .name {
// 						display: block;
// 						color: rgba(255, 255, 255, 0.9);
// 						font-size: 13px;
// 					}

// 					/*FOOTER*/

// 					.footer {
// 						color: rgba(255, 255, 255, 0.5);
// 					}

// 					.footer .heading {
// 						color: #ffffff;
// 						font-size: 20px;
// 					}

// 					.footer ul {
// 						margin: 0;
// 						padding: 0;
// 					}

// 					.footer ul li {
// 						list-style: none;
// 						margin-bottom: 10px;
// 					}

// 					.footer ul li a {
// 						color: rgba(255, 255, 255, 1);
// 					}

// 					@media screen and (max-width: 500px) {
// 						.icon {
// 							text-align: left;
// 						}

// 						.text-services {
// 							padding-left: 0;
// 							padding-right: 20px;
// 							text-align: left;
// 						}
// 					}

// 					.blink_me {
// 						color: #00c3ff;
// 						animation: blinker 2s linear infinite;
// 					}

// 					@keyframes blinker {
// 						40% {
// 							opacity: 0;
// 						}
// 					}

// 					.footer img {
// 						height: 25px;
// 					}
// 				</style>
// 			</head>

// 			<body
// 				width="100%"
// 				style="
// 					margin: 0;
// 					padding: 0 !important;
// 					mso-line-height-rule: exactly;
// 					background-color: #222222;
// 				"
// 			>
// 				<center style="width: 100%">
// 					<div
// 						style="
// 							display: none;
// 							font-size: 1px;
// 							max-height: 0px;
// 							max-width: 0px;
// 							opacity: 0;
// 							overflow: hidden;
// 							mso-hide: all;
// 							font-family: sans-serif;
// 						"
// 					>
// 						&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
// 					</div>
// 					<div style="max-width: 600px; margin: 0 auto" class="email-container">
// 						<!-- BEGIN BODY -->
// 						<table
// 							align="center"
// 							role="presentation"
// 							cellspacing="0"
// 							cellpadding="0"
// 							border="0"
// 							width="100%"
// 							style="margin: auto"
// 						>
// 							<tr>
// 								<td
// 									class="bg_dark logo"
// 									style="padding: 1em 2.5em; text-align: center"
// 								>
// 									<div>
// 										<div style="padding: 21px 0 5px">
// 											<img
// 												src="https://drive.google.com/uc?export=view&id=1ZPXA-QyVeQFPDPZsphksFUxrVtGFFTls"
// 												alt=""
// 												style="
// 													width: 50%;
// 													max-width: 600px;
// 													height: auto;
// 													margin: auto;
// 													display: block;
// 												"
// 											/>
// 										</div>
// 									</div>
// 								</td>
// 							</tr>

// 							<tr>
// 								<td class="bg_white">
// 									<table
// 										role="presentation"
// 										cellspacing="0"
// 										cellpadding="0"
// 										border="0"
// 										width="100%"
// 									>
// 										<tr>
// 											<td class="bg_dark email-section" style="text-align: center">
// 												<div class="heading-section heading-section-white">
// 													<h2>PPE That Makes A Difference.</h2>
// 													<p>
// 														The mining industry and environmental pollution have
// 														historically gone hand in hand Exposure to mining dust
// 														has an adverse impact on the health and lifespan of all
// 														stakeholders to the industry
// 													</p>
// 													<a
// 														href="https://link.springer.com/article/10.1007/s40726-019-00108-5"
// 														target="_blank"
// 													>
// 														<button
// 															style="
// 																padding: 10px;
// 																border-radius: 5px;
// 																cursor: pointer;
// 															"
// 														>
// 															Read More
// 														</button>
// 													</a>
// 												</div>
// 											</td>
// 										</tr>

// 										<tr>
// 											<td class="bg_dark">
// 												<table
// 													role="presentation"
// 													border="0"
// 													cellpadding="0"
// 													cellspacing="0"
// 													width="100%"
// 												>
// 													<tr>
// 														<td valign="middle" width="50%">
// 															<table
// 																role="presentation"
// 																cellspacing="0"
// 																cellpadding="0"
// 																border="0"
// 																width="100%"
// 															>
// 																<tr>
// 																	<td>
// 																		<div>
// 																			<img
// 																				src="https://drive.google.com/uc?export=view&id=1s_gBLzxIQozQAwS-hbuTiWIvoLmuIGsZ"
// 																				alt=""
// 																				style="
// 																					width: 100%;
// 																					max-width: 600px;
// 																					height: auto;
// 																					margin: auto;
// 																					display: block;
// 																				"
// 																			/>
// 																		</div>
// 																	</td>
// 																</tr>
// 															</table>
// 														</td>
// 														<td valign="middle" width="50%">
// 															<table
// 																role="presentation"
// 																cellspacing="0"
// 																cellpadding="0"
// 																border="0"
// 																width="100%"
// 															>
// 																<tr>
// 																	<td
// 																		class="text-services"
// 																		style="text-align: left; padding: 20px 30px"
// 																	>
// 																		<div class="heading-section">
// 																			<h2
// 																				style="
// 																					font-size: 23px;
// 																					text-align: left;
// 																					color: white;
// 																				"
// 																			>
// 																				Benefits
// 																			</h2>
// 																		</div>
// 																		<img
// 																			src="https://drive.google.com/uc?export=view&id=1YqKTM6Gft6Mzj1fy6wIsN7esr3cC61ml"
// 																			alt=""
// 																			style="
// 																				width: 100%;
// 																				max-width: 600px;
// 																				height: auto;
// 																				margin: auto;
// 																				display: block;
// 																			"
// 																		/>
// 																	</td>
// 																</tr>
// 															</table>
// 														</td>
// 													</tr>
// 												</table>
// 											</td>
// 										</tr>

// 										<tr>
// 											<td class="bg_dark email-section">
// 												<div
// 													class="heading-section heading-section-white"
// 													style="text-align: center"
// 												>
// 													<h2 style="margin: 0; color: white">BUT YOU CAN HELP</h2>
// 													<p>
// 														At AUUM Platforms, we have devised SWASNER, a ventilated
// 														PPE that protects from exposure to harmful pollutants
// 														and gases. We can meet your CSR requirements at the drop
// 														of a hat.
// 													</p>
// 													<a
// 														href="https://www.auum.in/swasnerresearch"
// 														target="_blank"
// 													>
// 														<h3 class="blink_me">Click On Me To Look At Swasner</h3>
// 													</a>
// 													<div>
// 														<a
// 															href="https://calendly.com/meet_with_sambit/meeting-room"
// 															target="_blank"
// 															><button
// 																class="btn new"
// 																style="margin-bottom: 11px; cursor: pointer"
// 															>
// 																Schedule a meeting
// 															</button></a
// 														>

// 														<a href="tel:+91-8249158968">
// 															<button class="btn new" style="cursor: pointer">
// 																Call Us at +91-8249158968
// 															</button>
// 														</a>
// 													</div>
// 												</div>
// 											</td>
// 										</tr>
// 									</table>
// 								</td>
// 							</tr>
// 						</table>

// 						<table
// 							align="center"
// 							role="presentation"
// 							cellspacing="0"
// 							cellpadding="0"
// 							border="0"
// 							width="100%"
// 							style="margin: auto"
// 						>
// 							<tr>
// 								<td
// 									class="bg_dark logo"
// 									style="padding: 1em 2.5em; text-align: center"
// 								>
// 									<div>
// 										<img
// 											src="https://drive.google.com/uc?export=view&id=1ZPXA-QyVeQFPDPZsphksFUxrVtGFFTls"
// 											alt=""
// 											style="
// 												width: 30%;
// 												max-width: 600px;
// 												height: auto;
// 												margin: auto;
// 												margin-bottom: 10px;
// 												display: block;
// 											"
// 										/>
// 									</div>

// 									<h5 style="color: white; margin: 20px 0">
// 										<a href="https://www.auum.in/swasnerresearch" target="_blank"
// 											>RESEARCH</a
// 										>
// 										|
// 										<a href="https://www.auum.in/" target="_blank">OUR WEBSITE</a> |
// 										<a href="https://www.auum.in/contactus" target="_blank">
// 											CONTACT</a
// 										>
// 									</h5>

// 									<div class="footer">
// 										<a
// 											href="https://in.linkedin.com/company/auum-technologies"
// 											target="_blank"
// 										>
// 											<img
// 												src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png"
// 												alt=""
// 											/>
// 										</a>
// 										<a
// 											href="https://www.instagram.com/auumplatforms/?hl=en"
// 											target="_blank"
// 										>
// 											<img
// 												src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
// 												alt=""
// 											/>
// 										</a>
// 										<a href="facebook.com/auumplatforms/" target="_blank">
// 											<img
// 												src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
// 												alt=""
// 											/>
// 										</a>
// 										<a
// 											href="https://twitter.com/AUUM_Platforms
// 										"
// 											target="_blank"
// 										>
// 											<img
// 												src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
// 												alt=""
// 											/>
// 										</a>
// 									</div>
// 								</td>
// 							</tr>
// 						</table>
// 					</div>
// 				</center>
// 			</body>
// 		</html>

//     `,
// 	};
// 	transporter.sendMail(mailOptions, function (error, info) {
// 		if (error) {
// 			res.json({
// 				message: "verification mail not send",
// 				status: 200,
// 			});
// 		} else {
// 			res.json({
// 				message: "verification mail  send",
// 				status: 200,
// 			});
// 		}
// 	});

// 	// sendEmail()
// 	//   .then((newres) => console.log("send"))
// 	//   .catch((err) => {
// 	//     res.status(500).send("error: " + err.message);
// 	//   });
// 	// res.json({
// 	//   message: "Welcome to LOVE ❤️ AKOT ",
// 	// });
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
// 	console.log(`Server is running on port ${PORT}.`);
// });

// // vlarwtukiusjrntf
