import {configure} from '@reskript/settings';

export default configure(
    'webpack',
    {
        build: {
            appTitle: 'Export Wrapper Project',
        },
        devServer: {
            port: 9031,
        },
    }
);
