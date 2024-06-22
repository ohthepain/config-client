import axios from "axios";

var adminToken: string;
var adminUserId: string;
var projectId: string;
var branchId: string;

const projectName = "Power Yoga Center";
const branchName = "main";
const gitRepo = "git@github.com:ohthepain/yoga-server.git";
const bucketName = "yoga-server";
var configId = 61;
const clientDownloadKey = `config_${configId}.bin`;
const clientDownloadBucket = bucketName;
const uploadLocation = `${bucketName}/${clientDownloadKey}`;
const downloadUrl = `https://${bucketName}.s3.amazonaws.com/${clientDownloadKey}`;
const configServiceUrl = import.meta.env.VITE_CONFIG_SERVICE_URL;

export async function setUpEnvironmentProd() {
  const miniheaders = {
    "Content-Type": "application/json",
  };

  var data = {
    email: import.meta.env.VITE_PAUL_THISCO_ADMIN_EMAIL,
    password: import.meta.env.VITE_PAUL_THISCO_ADMIN_PASSWORD,
    roles: ["user", "admin"],
  };

  console.log(
    `${data.email} ${data.password} ${data.roles} ${configServiceUrl}`,
  );

  try {
    await axios
      .post(`${configServiceUrl}/api/users/register`, data, {
        headers: miniheaders,
      })
      .then((response) => {
        console.log(response.data);
        adminUserId = response.data.id;
        console.log("Admin ID: " + adminUserId);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }

  console.log(`auth`);

  // Authenticate and get token
  await axios
    .post(
      `${configServiceUrl}/api/auth`,
      {
        email: "paul@thisco.co",
        password: import.meta.env.VITE_PAUL_THISCO_ADMIN_PASSWORD,
      },
      { headers: miniheaders },
    )
    .then((response) => {
      console.log(response.data);
      adminToken = response.data.accessToken;
      console.log("Admin Token: " + adminToken);
    })
    .catch((error) => {
      console.error(error);
    });

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${adminToken}`,
  };

  console.log(`project`);

  await axios
    .put(
      `${configServiceUrl}/api/projects`,
      {
        name: "Power Yoga Center",
        bucket: "yoga.config",
        gitRepo: gitRepo,
      },
      { headers: headers },
    )
    .then((response) => {
      console.log(response.data);
      projectId = response.data.id;
      console.log("Project ID: " + projectId);
    })
    .catch((error) => {
      console.error(error);
    });

  console.log(`branch`);

  // Create branch
  await axios
    .put(
      `${configServiceUrl}/api/branches`,
      { name: branchName, projectName: projectName, gitBranch: branchName },
      { headers: headers },
    )
    .then((response) => {
      console.log(response.data);
      branchId = response.data.id;
      console.log("Branch ID: " + branchId);
    })
    .catch((error) => {
      console.error(error);
    });

  console.log(`environment`);

  // Create environment
  await axios
    .put(
      `${configServiceUrl}/api/environments`,
      {
        name: "main",
        projectName: projectName,
        gitBranch: branchName,
        uploadLocation: uploadLocation,
        downloadUrl: downloadUrl,
        clientDownloadBucket: clientDownloadBucket,
        bucket: clientDownloadKey,
      },
      { headers: headers },
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}
