import React from "react"
import ReactDOM from "react-dom"
import ReactGA from "react-ga4"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { CssBaseline } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import { App } from "./App"
import { MainTheme } from "./theme"
import reportWebVitals from "./reportWebVitals"

if (process.env.NODE_ENV === "production") {
	ReactGA.initialize("G-5STKYBBJ0M")
	ReactGA.send("pageview")
}

// Setup GraphQL Client
const client = new ApolloClient({
	uri: `//${process.env.NODE_ENV === "production" ? process.env.REACT_APP_API_ENDPOINT : window.location.host}/api/gql/query`,
	cache: new InMemoryCache(),
})

// Render the main app
ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<ThemeProvider theme={MainTheme}>
				<CssBaseline />
				<App />
			</ThemeProvider>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById("root"),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
