export const getGCPCredentials = () => {
    console.log("function ran");
    const test = process.env.GCP_PRIVATE_KEY
        ? {
            credentials: {
                client_email: process.env.GCP_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GCP_PRIVATE_KEY,
            },
            projectId: process.env.GCP_PROJECT_ID,
        }
    // for local development, use gcloud CLI
        : {};
    console.log(test);
    return test;
};