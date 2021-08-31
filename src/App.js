import React, {useEffect, useState} from 'react';
import './App.css'
import {
    Typography,
    Container,
    CssBaseline,
    Card,
    CardContent,
    makeStyles,
    Button,
    CardActions, Input,
} from "@material-ui/core";
import axios from "axios";


const useStyles = makeStyles({
    card: {
        marginTop: 20,
        marginBottom: 20,
        fontWeight: 20
    },
    cardContent: {
        paddingBottom: 10,

    },
    cardActions:{
        padding: '40px',
        WebkitColumnSpan: "inherit"
    }
})

function App() {

    const classes = useStyles();

    const [state, setState] = useState({
        joke: '',
        cat: '',
    });
    const [query, setQuery] = useState('food')

    useEffect(() => {
        getResults();
    },[]);

    useEffect( () => {
        fetchData();


    },[]);
    const randomJoke = () => {
     // console.log('random joke', state)
        fetchData();
    }

    const handleSearch = (e) =>{
        e.preventDefault()
        getResults();
    }
    const getResults = async () => {
        return await axios
            .get(`https://api.chucknorris.io/jokes/search?query=${query}`)
            .then((res) =>console.log(res.data.result))
    };


    const fetchData = async () => {
        const result = await axios.get('https://api.chucknorris.io/jokes/random')
        // console.log(result.data.value);

        setState({
            ...state,
            joke: result.data.value,
            cat: result.data.result
        });
    }
  return (
    <div className="App">
        <CssBaseline/>
        <Container>
            <Typography variant = "h1" align="center">
                Chuck Norris Jokes
            </Typography>
            <form onSubmit={handleSearch}>
                <Input type="text"
                       onChange={e => setQuery(e.target.value)}
                       value={query}
                />
                <Button type="submit">Search</Button>
            </form>
               <Card className={classes.card}>
                   <CardContent>
                    <Typography>{state.joke}</Typography>

                   </CardContent>
               </Card>
            <CardActions className={classes.cardActions}>
                <Button variant='contained'
                        style={{marginTop: 20, marginBottom: 20}}
                        color='primary'
                        onClick={() => randomJoke(state.joke)}>
                    Random joke
                </Button>
            </CardActions>
        </Container>
    </div>
  );
}

export default App;
