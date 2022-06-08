
import React from 'react'
import { Container, Stack, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import RecipeCard from '../../components/RecipeCard';
import { useFetch } from '../../hooks/useFetch';

export default function SearchPage() {
    const queryString = useLocation().search
    const queryParams = new URLSearchParams(queryString);
    const query = queryParams.get('q')
    debugger;
    const { data: recipes, error, isPending } = useFetch(`http://localhost:3001/recipes?q=${query}`)


    return (
        <Container>
            <h2 className='text-center text-success my-5'>Recipes including "{query}"</h2>
            <Stack direction="horizontal" gap={3} className="mt-4 flex-wrap">
                {error && <h2 className='fs-1 text-danger'>{error}</h2>}
                {isPending && <h2 className='text-warning'>Loading...</h2>}
                {recipes && recipes.length === 0 && (
                    <Alert variant="danger w-100 text-center">
                        No recepies found!
                    </Alert>
                )}
                {recipes && !isPending && !error && recipes.map(recipe => (
                    <RecipeCard key={recipe.id} id={recipe.id} title={recipe.title} cookingTime={recipe.cookingTime} method={recipe.method} />
                ))}
            </Stack>
        </Container>
    )
}
