import * as React from 'react'

export default React.createContext({
	user: null,
	setUserData: (val) => {
		return val
	}
})

