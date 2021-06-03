const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const fs = require('fs');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const express = require('express');
const mysql = require('mysql');
const app = express();


app.get('/levels', async (req, res) => {
  console.log(req.body);
  res.status(201).send("it worked");
  //get_boats(req).then(entity => {
    //  res.status(200).send(entity);
  //})
});




/* var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword"
}); */



module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    setup(app) 
    {
      app.get('/levels', (req, res) => {
        //console.log(req.body);
        res.status(201).send("it worked");
      });

      app.post('/test', jsonParser, async function(req, res)  {
        var check = req.body;
        //console.log(check);
        //console.log(JSON.stringify(check));
        let r = Math.random().toString(36).substr(2, 3) + "-" + Math.random().toString(36).substr(2, 3);
        var place = 'src/levels/user/' + r + '.json';
        var myMap = JSON.stringify(req.body);//JSON.stringify(req.params.test_id);
        //console.log(myMap);
        var fs = require('fs');
        fs.writeFile(place, myMap, function(err, result) 
        {
          if(err) {console.log('error', err);}
          else
          {
            res.status(201).json(r);
          }
        });
      });
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: "raw-loader"
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml)$/i,
        use: "file-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, "../")
    }),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ]
};
