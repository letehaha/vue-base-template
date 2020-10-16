import packageJson from '../package';

export default ({
  /**
   * App name
   */
  APP_NAME: 'Example',

  /**
   * Default limit of the number of requests per a page
   */
  REQUESTS_PER_PAGE: 10,

  /**
   * Default amount precision, the number of digits
   * after a point
   */
  DECIMAL_POINTS: 2,

  /**
   * Default acceptable step for amount change,
   * depends on amount precision
   */
  MINIMAL_NUMBER_INPUT_STEP: 0.000001,

  /**
   * Should be populated by DevOps team during the deployment
   * The field being displayed on login screen.
   */
  BUILD_VERSION: packageJson.version,

  /**
   * User will be logged out after IDLE_TIMEOUT (minutes) time of
   * inactivity
   */
  IDLE_TIMEOUT: 15,

  SUPPORTED_LANGUAGES: [
    {
      code: 'en',
      iso: 'en-US',
      name: 'languages.en',
      file: 'en.json',
      isDefault: true,
    },
  ],
});
