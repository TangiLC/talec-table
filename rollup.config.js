import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index.jsx', 
  output: {
    file: 'dist/bundle.js', 
    format: 'cjs' 
  },
  plugins: [
    babel({ 
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env', '@babel/preset-react']
    })
  ]
};
