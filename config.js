
var project_config = require('./config.project');

module.exports = {
    // gulp update parameters
    ODS_PORTAL_DOMAIN_ID: project_config.ODS_PORTAL_DOMAIN_ID,
    DEFAULT_DOMAIN_URL: project_config.DEFAULT_DOMAIN_URL,

    ODS_USERNAME: 'aubin.didier0',
    ODS_PASSWORD: 'qjm_tvd5uny2VPF_hcv',

    // HTTP Intercept queries to add domain or apikey params to dataset-context
    API_KEYS: [
        {
            'domain':'atih.opendatasoft.com',
            'apikey':'97c3367c032359bce67fca78309b3e3e9ae8e32823fc31b671e04ef0',
        },
    ],

    // List of pages, used by the gulp server and gulp update/compile commands
    PAGES: project_config.PAGES,

    // Adv. settings
    WATCH_DIRS: [
        "./pages/views/**/*.html",
        "./pages/views/**/*.ejs"
    ],
    BROWSER: "google chrome",

    // You usually shouldn't have to edit these
    ODS_PORTAL_SUFFIX: '.opendatasoft.com',
    SERVER_PORT: 9090,
    OUTPUT_DIR: 'output'
};