import { ThemeContext } from '../context/ThemeContext'
import { useContext } from 'react'
export const useTheme = () => {

    const context = useContext(ThemeContext)

    if (context === undefined) {
        throw new Error("useTheme() must be inside a ThemeProvider")
    }

    return context

}