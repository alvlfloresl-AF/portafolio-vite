import indexPage from "./pages/index.js";

const getPageContext = (pagePath) => {
    switch (pagePath) {
        case "/index.html":
            return indexPage;
        default:
            return {};
    }
};

export default getPageContext;