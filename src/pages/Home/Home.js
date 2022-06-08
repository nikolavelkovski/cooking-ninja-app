
import React, { useEffect, useState } from 'react'
import { Container, Stack } from 'react-bootstrap'
import RecipeCard from '../../components/RecipeCard'
import { useFetch } from '../../hooks/useFetch'
import { projectFirestore } from '../../firebase/config'
export default function Home() {
    // const { data: recipes, error, isPending } = useFetch('http://localhost:3001/recipes')
    const [recipes, setRecipes] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)
    useEffect(() => {

        setIsPending(true)
        const unsub = projectFirestore.collection('recipes').onSnapshot((snapshot) => {
            if (snapshot.empty) {
                setError("no recipes load")
                setIsPending(false)
                setRecipes(null)
            } else {
                let results = []
                snapshot.docs.forEach(doc => {
                    console.log(doc)
                    results.push({ id: doc.id, ...doc.data() })
                })
                setRecipes(results)
                setIsPending(false)
            }
        }, (err) => {
            setError(err.message)
            setIsPending(false)
        })

        return () => unsub()
    }, [])
    return (
        <Container>
            <Stack direction="horizontal" gap={3} className="mt-4 flex-wrap">
                {error && <h2 className='fs-1 text-danger'>{error}</h2>}
                {isPending && <h2 className='text-warning'>Loading...</h2>}
                {recipes && recipes.map(recipe => (
                    <RecipeCard key={recipe.id} id={recipe.id} title={recipe.title} cookingTime={recipe.cookingTime} method={recipe.method} />
                ))}
            </Stack>
        </Container>
    )
}
