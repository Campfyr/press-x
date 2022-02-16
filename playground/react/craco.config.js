const path = require('path');

const externalModules = [
    path.resolve(__dirname, '../../packages/press-x')
];

module.exports = {
    plugins: [
        {
            plugin: {
                overrideWebpackConfig: ({ webpackConfig }) => {
                    const oneOfRule = webpackConfig.module.rules.find((rule) => rule.oneOf);
                    if (oneOfRule) {
                        const tsRule = oneOfRule.oneOf.find(
                            (rule) => rule.test && rule.test.toString().includes('ts'),
                        );
                        if (tsRule) {
                            if (Array.isArray(tsRule.include)) {
                                tsRule.include = [...tsRule.include, ...externalModules];
                            } else {
                                tsRule.include = [tsRule.include, ...externalModules];
                            }
                        }
                    }
                    return webpackConfig;
                },
            },
        },
    ]
}