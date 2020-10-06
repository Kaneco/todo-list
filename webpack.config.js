const path = require("path");

module.exports = {
	mode: "development",
	entry: "./src/index.js",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "localhost:8080",
	},
	devServer: {
		contentBase: [path.join(__dirname, "src"), path.join(__dirname, "dist")],
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ["file-loader"],
			},
			{
				test: /\.html$/i,
				loader: "html-loader",
				options: {
					// Disables attributes processing
					attrs: ['img:src', 'link:href'],
					attributes: true,
				},
			},
		],
	},
};
