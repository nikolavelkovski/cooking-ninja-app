
import React from 'react'
import { Container } from 'react-bootstrap';
import { useTheme } from '../hooks/useTheme';
import lightDarkToggle from './../assets/light-dark.svg'

const colors = ['red', 'yellow', 'green']
export default function ThemeChanger() {
    const { changeColor, changeMode, mode } = useTheme();

    const toggleMode = () => {
        mode === 'dark' ? changeMode('light') : changeMode('dark')
    }
    console.log(mode)
    return (
        <Container>
            <div className='theme-changer py-4'>
                <img src={lightDarkToggle} alt="light-dark toggler" onClick={toggleMode} style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)' }} />

                {colors.map((color) =>
                    <div key={color} style={{ background: color }} onClick={() => changeColor(color)} />
                )}

            </div>
        </Container>

    )
}
