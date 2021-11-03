module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    // we use both the airbnb-ruleset and the typescript/recommended
    // ruleset. these two sometimes conflict, and we have
    // to handle those conflicts here.
    // the typescript-plugin sometimes
    // has to override eslint-default rules.
    // for example, it needs to extend the `camelcase` rule
    // to handle things that are typescript-specific.
    // so what it does is it disables the `camelcase` rule,
    // and creates a `@typescript-eslint/camelcase` rule,
    // that does the same as the `camelcase` rule + some extra checks.
    // the problem happens, when the airbnb-rules configure
    // `camelcase` to something specific, and then
    // `@typescript-eslint/camelcase` says something else.
    // so we manually have to check which eslint-rules
    // does `typescript-eslint disable`, and find those
    // in airbnb, and copy them here under the `@typescript-eslint/*` rule
    // generally speaking, one has to open the typescript/recommended
    // ruleset, and for every change it does to not-typescript rules,
    // one has to check if airbnb did the same change. if not,
    // one has to decide to accept typescript-plugin's opinion,
    // and do nothing, or copy the airbnb rule here.

    // start of copied-from-airbnb-rules
    "@typescript-eslint/no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: true },
    ],
    // end of copied-from-airbnb-rules

    // Dusan hates this one
    "no-lonely-if": "off",
    // G. hates this one
    "no-else-return": "off",

    // we do not agree with airbnb on this
    // see this for a discussion: https://github.com/airbnb/javascript/issues/1135
    "import/prefer-default-export": "off",

    // sometimes the variable has the underscore at the beginning,
    // for example `__typename` in graphql.
    // also, prefixing a method-name with `_` is a simple way to
    // signalize that a method is private-ish, without having
    // to enforce it.
    "no-underscore-dangle": "off",

    // We have added Storybook .story files [Slido]
    // Forbid the use of extraneous packages
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    // paths are treated both as absolute paths, and relative to process.cwd()

    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "test/**", // tape, common npm pattern
          "tests/**", // also common npm pattern
          "spec/**", // mocha, rspec-like pattern
          "**/__tests__/**", // jest pattern
          "**/__mocks__/**", // jest pattern
          "test.{js,jsx}", // repos with a single test file
          "test-*.{js,jsx}", // repos with multiple top-level test files
          "**/*{.,_}{test,spec}.{js,jsx}", // tests where the extension or filename suffix denotes that it is a test
          "**/jest.config.js", // jest config
          "**/jest.setup.js", // jest setup
          "**/vue.config.js", // vue-cli config
          "**/webpack.config.js", // webpack config
          "**/webpack.config.*.js", // webpack config
          "**/rollup.config.js", // rollup config
          "**/rollup.config.*.js", // rollup config
          "**/gulpfile.js", // gulp config
          "**/gulpfile.*.js", // gulp config
          "**/Gruntfile{,.js}", // grunt config
          "**/protractor.conf.js", // protractor config
          "**/protractor.conf.*.js", // protractor config
          "**/*.story.{ts,tsx}", // Storybook story files - ADDED by Slido
          "**/*.stories.{ts,tsx}", // Storybook story files - ADDED by Slido
        ],
        optionalDependencies: false,
      },
    ],
    // we do not need to specify the return-type in every function
    "@typescript-eslint/explicit-function-return-type": "off",
    // we want to ensure when both type/interface can be used,
    // "type" is used. the reason is that types will be used anyway
    // for cases where interfaces cannot be used ( for example
    // `type Direction = 'left' | 'right';` ), so let's keep
    // everything uniform as much as possible. technically there
    // might be situations where we must use an interface,
    // but those cases seem to be rare (and we will just disable
    // the rule for that line of code)
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    // we turn this one off, because the next rule (naming-convention) takes care of this
    camelcase: "off",
    // @typescript-esling changed `camelcase` rule to `naming-convention`
    // we allow UPPER_CASE for QUERY variables (GraphQL) and PascalCase for React components
    // typeLike is always PascalCase (type ImageFormat = ...)
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "default",
        format: ["camelCase", "UPPER_CASE", "PascalCase"],
        leadingUnderscore: "allow",
      },
      { selector: "typeLike", format: ["PascalCase"] },
    ],
    // renamed `ban-ts-ignore`
    // we don't allow usage of `@ts-ignore` and such
    "@typescript-eslint/ban-ts-comment": 2,

    // every dependency is a dev-dependency for us,
    // because we build every production-thing
    // into it's own bundle, both the server and client.
    // so we have to allow importing-from-dev-dependencies.
    // later we might move this override into the Slido
    // ruleset.
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
        bundledDependencies: false,
      },
    ],
    // --------------------------------------------------------------------------
    // Rules under this line are exclusive to this config. Everything above should
    // be same in all our configs.

    "import/extensions": [
      "error",
      "always",
      {
        js: "never",
        ts: "never",
      },
    ],
  },
};
