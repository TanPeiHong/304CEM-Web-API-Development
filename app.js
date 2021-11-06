const axios = require('axios');
const express = require('express');
const app = express();
const Food = require('./connect');

const apiKey = '94bfbf4e620544c0b663dc858ccada11';

//To add the food
//http://localhost:5000/addFood?title=Pizza
app.get('/addFood', (req, res) => {
    const title = req.query.title;

    //First API (Spoonacular API)
    const querystr = `https://api.spoonacular.com/recipes/complexSearch?query=${title}&apiKey=${apiKey}`;

    //Second API (The Meal DB API)
    const querystr2 = `https://www.themealdb.com/api/json/v1/1/search.php?s=${title}`;

    axios.get(querystr).then( (response) => {
        axios.get(querystr2).then( (response2) => {
            foodValue = new Food ({
                title: response.data.results[0].title,
                image: response.data.results[0].image,
                category: response2.data.meals[0].strCategory,
                area: response2.data.meals[0].strArea,
                instructions: response2.data.meals[0].strInstructions
            });
            
            //console.log(response);
            if (!foodValue.title){
                res.status(200).json('Not found');

                return;
            }

            foodValue.save().then((response) => {
                //console.log("Success" + response);
                res.status(200).json(response);
            })

            .catch((error) => {
                //console.log("Error" + error);
                res.status(400).json(error);
            });
        })
        .catch((error) => {
            //console.log("Error" + error);
            res.status(400).json(error);
        });
    })
    .catch((error) => {
        //console.log("Error" + error);
        res.status(400).json(error);
    });
});

//To display all the Foods
//http://localhost:5000/getAllFoods
app.get('/getAllFoods', (req, res) => {
    Food.find({}).then((response) => {
        res.status(200).json(response);
    })

    .catch((error) => {
        res.status(400).json(error);
    });
});

//To delete the Food
//http://localhost:5000/deleteFood?title=title
app.get('/deleteFood', (req, res) => {
    //Delete Food based on title
    Food.deleteOne( {title: req.query.title} ).then((response) => {
        res.status(200).json(response);
    })

    .catch((error) => {
        res.status(400).json(error);
    });
});

app.listen(5000, () => {
    console.log('Sever listening to port 5000');
});