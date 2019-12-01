module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'GraphiQLAuthToken',
      externals: {
        react: 'React'
      }
    }
  }
}
