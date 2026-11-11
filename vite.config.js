import { defineConfig } from "vite";
import path, { resolve } from "node:path";
import * as glob from "glob";
import handlebars from "vite-plugin-handlebars";

import getPageContext from "./src/data/index.js";

const __dirname = import.meta.dirname;

function obtenerHtmlFiles() {
    return Object.fromEntries(
        glob.sync(
            "./**/*.html",
            {
                ignore: [
                    "./dist/**",
                    "./node_modules/**"
                ]
            }
        ).map((file) => {
            return [
                file.slice(0, file.length - path.extname(file).length),
                resolve(__dirname, file)
            ];
        })
    );
}

export default defineConfig({
    appType: "mpa",
    base: "/portafolio-vite/",
    build: {
        minify: true,
        cssMinify: true,
        rolldownOptions: {
            input: obtenerHtmlFiles(),
        },
    },
    plugins: [
        new handlebars({
            partialDirectory: "src/components",
            context: getPageContext,
        }),
    ],
});