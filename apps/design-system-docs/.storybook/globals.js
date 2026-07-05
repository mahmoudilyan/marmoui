// Define required Storybook globals before anything else loads
if (typeof window !== 'undefined') {
  // Define all missing Storybook globals
  const globals = {
    __STORYBOOK_ADDONS_PREVIEW: {
      composeConfigs: function() { return {}; },
      addDecorator: function() {},
      addParameters: function() {},
      addLoader: function() {},
      addArgsEnhancer: function() {},
      addArgTypesEnhancer: function() {},
      setGlobalRender: function() {},
      configure: function() {},
      getStorybook: function() { return []; },
      raw: function() { return []; }
    },
    __STORYBOOK_MODULE_CLIENT_LOGGER__: {
      log: function() {},
      warn: function() {},
      error: function() {}
    },
    __STORYBOOK_MODULE_CORE_EVENTS__: {
      STORY_CHANGED: 'storyChanged',
      SET_CURRENT_STORY: 'setCurrentStory',
      FORCE_RE_RENDER: 'forceReRender'
    },
    __STORYBOOK_MODULE_GLOBAL__: {},
    __STORYBOOK_MODULE_CHANNELS__: {
      addons: {
        getChannel: function() {
          return {
            emit: function() {},
            on: function() {},
            off: function() {}
          };
        }
      }
    },
    __STORYBOOK_MODULE_PREVIEW_API__: {},
    __STORYBOOK_MODULE_CLIENT_API__: {}
  };

  // Set all globals
  Object.keys(globals).forEach(function(key) {
    if (!window[key]) {
      window[key] = globals[key];
    }
  });
}