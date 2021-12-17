import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { CssBaseline } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import { App } from "./App"
import { MainTheme } from "./theme"
import reportWebVitals from "./reportWebVitals"

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
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ThemeProvider>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById("root"),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
