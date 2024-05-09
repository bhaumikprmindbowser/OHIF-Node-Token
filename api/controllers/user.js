const jwt = require("jsonwebtoken");
const {google} = require("googleapis")
const serviceAccountKey = require("../../details.json")

exports.user_token = async (req, res, next) => {
  try {
    // Create a new JWT client
    const jwtClient = new google.auth.JWT(
      serviceAccountKey.client_email,
      null,
      serviceAccountKey.private_key,
      [
        "https://www.googleapis.com/auth/cloud-healthcare",
        "https://www.googleapis.com/auth/cloud-platform",
        "https://www.googleapis.com/auth/cloud-platform.read-only",
        "https://www.googleapis.com/auth/datastore"
      ]
    )

    // Authorize the client
    await jwtClient.authorize()

    // Get the access token
    const accessToken = jwtClient.credentials.access_token

    // // Create a JWT token for your backend, if needed
    // const backendToken = jwt.sign({}, details.private_key, {
    //   expiresIn: "1h",
    //   algorithm: "RS256",
    //   keyid: serviceAccountKey.private_key_id,
    //   issuer: serviceAccountKey.client_email,
    //   subject: serviceAccountKey.client_email,
    //   audience: "https://oauth2.googleapis.com/token"
    // })

    return res.status(200).json({
      message: "Auth successful",
      token: accessToken
      // backendToken: backendToken // Include backend token if needed
    })
  } catch (error) {
    console.error("Error generating access token:", error)
    return res.status(500).json({error: "Internal server error"})
  }
}

// audience: [
//   // "https://healthcare.googleapis.com/",
//   // "https://cloudresourcemanager.googleapis.com/",
//   "https: //oauth2.googleapis.com/token",
//   "https://www.googleapis.com/auth/cloud-platform",
//   "https://www.googleapis.com/auth/cloudplatformprojects.readonly"
// ]
