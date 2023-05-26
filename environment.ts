import Constants from 'expo-constants';

const environments = {
    staging: {
        apiUrl: 'https://staging.example.com',
    },
    production: {
        apiUrl: 'https://example.com',
    },
};

const getEnvVars = (env = Constants.manifest?.releaseChannel) => {
    if (__DEV__) {
        return environments.staging;
    } else if (env === 'staging') {
        return environments.staging;
    } else if (env === 'production') {
        return environments.production;
    }
}

const currentEnvironment = getEnvVars();

export default currentEnvironment;