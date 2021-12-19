import { createTheme, responsiveFontSizes } from "@mui/material"

export const MainTheme = responsiveFontSizes(
	createTheme({
		palette: {
			background: {
				default: "#283E51",
			},
			text: {
				primary: "#404040",
				secondary: "#606c76",
			},
		},
		typography: {
			h1: {
				fontSize: "3.052rem",
			},
			h2: {
				fontSize: "2.441rem",
			},
			h3: {
				fontSize: "1.953rem",
			},
			h4: {
				fontSize: "1.563rem",
			},
			h5: {
				fontSize: "1.25rem",
			},
		},
		components: {
			MuiCssBaseline: {
				styleOverrides: `
				body {
					background: linear-gradient(to top, #283E51, #0A2342);
				}
				@font-face {
					font-family: "nitrocash";
					src: url("/fonts/nitro-cash.woff2") format("woff2"), url("/fonts/nitro-cash.woff") format("woff"), url("/fonts/nitro-cash.ttf") format("ttf"), url("/fonts/nitro-cash.eot") format("eot");
					font-weight: 400;
					font-style: normal;
				}`,
			},
		},
	}),
)
