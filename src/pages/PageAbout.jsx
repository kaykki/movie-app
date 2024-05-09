import { useEffect } from "react"
import { appTitle } from "../global/global"

const PageAbout = () => {

    useEffect(() => {
		document.title = "About | " + appTitle;
	}, [])

    return (
        <div>PageAbout</div>
    )
}

export default PageAbout